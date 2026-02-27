import { animated } from '@react-spring/web';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../../styles/colors';
import { server } from '../../../utils/edenTreaty';

type UniqueUser = {
	anonymous_id: string;
	total_events: number;
	first_seen: string;
	last_seen: string;
	versions: string[];
	os_list: string[];
};

type UserEvent = {
	id: string;
	event: string;
	anonymous_id: string;
	version: string | null;
	os: string | null;
	arch: string | null;
	bun_version: string | null;
	client_timestamp: Date;
	server_timestamp: Date;
	payload: Record<string, unknown> | null;
};

type UserEventsResponse = {
	rows: UserEvent[];
	total: number;
	page: number;
	pageSize: number;
};

type UserLabel = {
	anonymous_id: string;
	label: string;
};

type UniqueUsersSectionProps = {
	themeSprings: ThemeSprings;
};

const sectionTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
};

const inputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	padding: '0.4rem 0.6rem',
	width: '100%',
	maxWidth: '400px'
};

const tableStyle: CSSProperties = {
	borderCollapse: 'collapse',
	fontSize: '0.8rem',
	width: '100%'
};

const thStyle: CSSProperties = {
	borderBottom: `2px solid transparent`,
	borderImage: `linear-gradient(to right, ${primaryColor}40, ${secondaryColor}40) 1`,
	fontSize: '0.7rem',
	letterSpacing: '0.05rem',
	opacity: 0.7,
	padding: '0.5rem 0.75rem',
	textAlign: 'left',
	textTransform: 'uppercase'
};

const tdStyle: CSSProperties = {
	borderBottom: '1px solid rgba(128, 128, 128, 0.1)',
	padding: '0.5rem 0.75rem',
	maxWidth: '200px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap'
};

const buttonStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	padding: '0.3rem 0.8rem'
};

const paginationStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	justifyContent: 'center',
	marginTop: '0.5rem'
};

const sectionStyle = (themeSprings: ThemeSprings) => ({
	backdropFilter: 'blur(12px)',
	backgroundColor: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? 'rgba(17, 17, 22, 0.7)'
			: 'rgba(255, 255, 254, 0.7)'
	),
	border: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? '1px solid rgba(255, 255, 255, 0.05)'
			: '1px solid rgba(0, 0, 0, 0.05)'
	),
	borderRadius: '0.75rem',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
	overflow: 'hidden',
	padding: '1.5rem',
	width: '100%'
});

const drilldownStyle: CSSProperties = {
	background: 'rgba(128, 128, 128, 0.05)',
	borderRadius: '0.5rem',
	margin: '0 0.5rem',
	padding: '1rem'
};

const labelInputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.5)',
	borderRadius: '0.25rem',
	color: 'inherit',
	flex: 1,
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	minWidth: '80px',
	padding: '0.2rem 0.4rem'
};

const labelCellStyle: CSSProperties = {
	...tdStyle,
	cursor: 'text',
	minWidth: '120px'
};

const userColumns = [
	'anonymous_id',
	'label',
	'total_events',
	'first_seen',
	'last_seen',
	'versions',
	'os_list'
];

const eventColumns = [
	'event',
	'version',
	'os',
	'arch',
	'client_timestamp',
	'payload'
];

const UserDrilldown = ({
	anonymousId,
	themeSprings
}: {
	anonymousId: string;
	themeSprings: ThemeSprings;
}) => {
	const [page, setPage] = useState(1);
	const [expandedRow, setExpandedRow] = useState<string | null>(null);

	const eventsQuery = useQuery({
		queryKey: ['user-events', anonymousId, page],
		queryFn: async () => {
			const { data, error } = await server.api.v1.telemetry
				.users({ anonymousId })
				.events.get({
					query: {
						page: String(page),
						pageSize: '20'
					}
				});
			if (error) throw new Error('Failed to fetch user events');
			if (!('rows' in data))
				throw new Error('Invalid user events response');
			return data;
		}
	});

	if (eventsQuery.isPending) {
		return (
			<div style={drilldownStyle}>
				<div
					style={{
						opacity: 0.5,
						padding: '1rem',
						textAlign: 'center'
					}}
				>
					Loading events...
				</div>
			</div>
		);
	}

	const data = eventsQuery.data;
	const rows = data?.rows ?? [];
	const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

	const formatCell = (row: UserEvent, col: string) => {
		const value = row[col as keyof UserEvent];
		if (col === 'payload') {
			const str = JSON.stringify(value);
			return str.length > 50 ? str.slice(0, 50) + '...' : str;
		}
		if (col === 'client_timestamp' && value) {
			return new Date(String(value)).toLocaleString();
		}
		return value == null ? '-' : String(value);
	};

	return (
		<div style={drilldownStyle}>
			<animated.div
				style={{
					...sectionStyle(themeSprings),
					padding: '1rem'
				}}
			>
				<div style={{ overflowX: 'auto' }}>
					<table style={tableStyle}>
						<thead>
							<tr>
								{eventColumns.map((col) => (
									<th key={col} style={thStyle}>
										{col}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.length === 0 ? (
								<tr>
									<td
										colSpan={eventColumns.length}
										style={{
											opacity: 0.5,
											padding: '1rem',
											textAlign: 'center'
										}}
									>
										No events
									</td>
								</tr>
							) : (
								rows.map((row) => (
									<>
										<tr
											key={row.id}
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setExpandedRow(
													expandedRow === row.id
														? null
														: row.id
												)
											}
										>
											{eventColumns.map((col) => (
												<td key={col} style={tdStyle}>
													{formatCell(row, col)}
												</td>
											))}
										</tr>
										{expandedRow === row.id && (
											<tr key={`${row.id}-expanded`}>
												<td
													colSpan={
														eventColumns.length
													}
													style={{
														fontSize: '0.75rem',
														maxHeight: '200px',
														overflowY: 'auto',
														padding: '0.75rem',
														whiteSpace: 'pre-wrap',
														wordBreak: 'break-all'
													}}
												>
													{JSON.stringify(
														row.payload,
														null,
														2
													)}
												</td>
											</tr>
										)}
									</>
								))
							)}
						</tbody>
					</table>
				</div>

				{totalPages > 1 && (
					<div style={paginationStyle}>
						<button
							style={buttonStyle}
							disabled={page <= 1}
							onClick={() => setPage((p) => p - 1)}
						>
							Prev
						</button>
						<span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
							Page {page} of {totalPages}
						</span>
						<button
							style={buttonStyle}
							disabled={page >= totalPages}
							onClick={() => setPage((p) => p + 1)}
						>
							Next
						</button>
					</div>
				)}
			</animated.div>
		</div>
	);
};

export const UniqueUsersSection = ({
	themeSprings
}: UniqueUsersSectionProps) => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState('');
	const [expandedUser, setExpandedUser] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editValue, setEditValue] = useState('');
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const labelInputRef = useRef<HTMLInputElement | null>(null);

	const usersQuery = useQuery({
		queryKey: ['telemetry-users'],
		queryFn: async () => {
			const { data, error } = await server.api.v1.telemetry.users.get();
			if (error) throw new Error('Failed to fetch users');
			if (!Array.isArray(data)) throw new Error('Invalid users response');
			return data;
		}
	});

	const labelsQuery = useQuery({
		queryKey: ['telemetry-user-labels'],
		queryFn: async () => {
			const { data, error } =
				await server.api.v1.telemetry['user-labels'].get();
			if (error) throw new Error('Failed to fetch labels');
			if (!Array.isArray(data))
				throw new Error('Invalid labels response');
			return data;
		}
	});

	const labels = useMemo(() => {
		const map: Record<string, string> = {};
		if (labelsQuery.data) {
			for (const row of labelsQuery.data) {
				map[row.anonymous_id] = row.label;
			}
		}
		return map;
	}, [labelsQuery.data]);

	const upsertMutation = useMutation({
		mutationFn: async ({
			anonymousId,
			label
		}: {
			anonymousId: string;
			label: string;
		}) => {
			const { error } = await server.api.v1.telemetry['user-labels']({
				anonymousId
			}).put({ label });
			if (error) throw new Error('Failed to save label');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['telemetry-user-labels']
			});
		}
	});

	const deleteLabelMutation = useMutation({
		mutationFn: async (anonymousId: string) => {
			const { error } = await server.api.v1.telemetry['user-labels']({
				anonymousId
			}).delete();
			if (error) throw new Error('Failed to delete label');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['telemetry-user-labels']
			});
		}
	});

	useEffect(() => {
		if (editingId && labelInputRef.current) {
			labelInputRef.current.focus();
		}
	}, [editingId]);

	const handleSearchChange = (value: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setSearch(value);
		}, 300);
	};

	const saveLabel = (anonymousId: string, value: string) => {
		const trimmed = value.trim();
		if (!trimmed) {
			deleteLabelMutation.mutate(anonymousId);
		} else {
			upsertMutation.mutate({ anonymousId, label: trimmed });
		}
		setEditingId(null);
	};

	const isLoading = usersQuery.isPending || labelsQuery.isPending;
	const users: UniqueUser[] = usersQuery.data ?? [];

	const formatCell = (row: UniqueUser, col: string) => {
		if (col === 'label') {
			return labels[row.anonymous_id] ?? '';
		}
		if (col === 'first_seen' || col === 'last_seen') {
			return new Date(row[col]).toLocaleString();
		}
		if (col === 'versions') {
			return (row.versions ?? []).filter(Boolean).join(', ') || '-';
		}
		if (col === 'os_list') {
			return (row.os_list ?? []).filter(Boolean).join(', ') || '-';
		}
		const value = row[col as keyof UniqueUser];
		return value == null ? '-' : String(value);
	};

	const filteredUsers = useMemo(() => {
		if (!search) return users;
		const lower = search.toLowerCase();
		return users.filter(
			(u) =>
				u.anonymous_id.toLowerCase().includes(lower) ||
				(labels[u.anonymous_id] ?? '').toLowerCase().includes(lower)
		);
	}, [users, search, labels]);

	return (
		<div style={gapStyle}>
			<div style={sectionTitleStyle}>Unique Users</div>
			<animated.div style={sectionStyle(themeSprings)}>
				<input
					type="text"
					placeholder="Search by anonymous ID or label..."
					style={inputStyle}
					onChange={(e) => handleSearchChange(e.target.value)}
				/>

				{isLoading ? (
					<div
						style={{
							opacity: 0.5,
							padding: '2rem',
							textAlign: 'center'
						}}
					>
						Loading users...
					</div>
				) : (
					<div style={{ overflowX: 'auto', marginTop: '1rem' }}>
						<table style={tableStyle}>
							<thead>
								<tr>
									{userColumns.map((col) => (
										<th key={col} style={thStyle}>
											{col}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filteredUsers.length === 0 ? (
									<tr>
										<td
											colSpan={userColumns.length}
											style={{
												opacity: 0.5,
												padding: '2rem',
												textAlign: 'center'
											}}
										>
											No users found
										</td>
									</tr>
								) : (
									filteredUsers.map((user) => (
										<>
											<tr
												key={user.anonymous_id}
												style={{ cursor: 'pointer' }}
												onClick={() =>
													setExpandedUser(
														expandedUser ===
															user.anonymous_id
															? null
															: user.anonymous_id
													)
												}
											>
												{userColumns.map((col) =>
													col === 'label' ? (
														<td
															key={col}
															style={
																labelCellStyle
															}
															onClick={(e) => {
																e.stopPropagation();
																setEditingId(
																	user.anonymous_id
																);
																setEditValue(
																	labels[
																		user
																			.anonymous_id
																	] ?? ''
																);
															}}
														>
															{editingId ===
															user.anonymous_id ? (
																<div
																	style={{
																		display:
																			'flex',
																		gap: '0.25rem',
																		alignItems:
																			'center'
																	}}
																>
																	<input
																		ref={
																			labelInputRef
																		}
																		type="text"
																		value={
																			editValue
																		}
																		style={
																			labelInputStyle
																		}
																		onChange={(
																			e
																		) =>
																			setEditValue(
																				e
																					.target
																					.value
																			)
																		}
																		onKeyDown={(
																			e
																		) => {
																			if (
																				e.key ===
																				'Enter'
																			) {
																				saveLabel(
																					user.anonymous_id,
																					editValue
																				);
																			} else if (
																				e.key ===
																				'Escape'
																			) {
																				setEditingId(
																					null
																				);
																			}
																		}}
																		onBlur={() => {
																			setTimeout(
																				() => {
																					setEditingId(
																						(
																							curr
																						) =>
																							curr ===
																							user.anonymous_id
																								? null
																								: curr
																					);
																				},
																				150
																			);
																		}}
																		onClick={(
																			e
																		) =>
																			e.stopPropagation()
																		}
																	/>
																	<button
																		disabled={
																			editValue.trim() ===
																			(labels[
																				user
																					.anonymous_id
																			] ??
																				'')
																		}
																		style={{
																			...buttonStyle,
																			cursor:
																				editValue.trim() ===
																				(labels[
																					user
																						.anonymous_id
																				] ??
																					'')
																					? 'default'
																					: 'pointer',
																			fontSize:
																				'0.7rem',
																			opacity:
																				editValue.trim() ===
																				(labels[
																					user
																						.anonymous_id
																				] ??
																					'')
																					? 0.3
																					: 1,
																			padding:
																				'0.2rem 0.5rem',
																			whiteSpace:
																				'nowrap'
																		}}
																		onClick={(
																			e
																		) => {
																			e.stopPropagation();
																			saveLabel(
																				user.anonymous_id,
																				editValue
																			);
																		}}
																	>
																		Save
																	</button>
																</div>
															) : (
																<span
																	style={{
																		opacity:
																			labels[
																				user
																					.anonymous_id
																			]
																				? 1
																				: 0.3
																	}}
																>
																	{labels[
																		user
																			.anonymous_id
																	] ||
																		'click to label'}
																</span>
															)}
														</td>
													) : (
														<td
															key={col}
															style={tdStyle}
														>
															{formatCell(
																user,
																col
															)}
														</td>
													)
												)}
											</tr>
											{expandedUser ===
												user.anonymous_id && (
												<tr
													key={`${user.anonymous_id}-drilldown`}
												>
													<td
														colSpan={
															userColumns.length
														}
														style={{ padding: 0 }}
													>
														<UserDrilldown
															anonymousId={
																user.anonymous_id
															}
															themeSprings={
																themeSprings
															}
														/>
													</td>
												</tr>
											)}
										</>
									))
								)}
							</tbody>
						</table>
					</div>
				)}
			</animated.div>
		</div>
	);
};
