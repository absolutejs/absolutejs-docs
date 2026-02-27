import { animated } from '@react-spring/web';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { LuCopyCheck } from 'react-icons/lu';
import { ThemeSprings } from '../../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../../styles/colors';
import { server } from '../../../utils/edenTreaty';
import { Modal } from '../../utils/Modal';
import { VersionSelect } from '../VersionSelect';

type TelemetryEventRow = {
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

type EventLogResponse = {
	rows: TelemetryEventRow[];
	total: number;
	page: number;
	pageSize: number;
};

type EventLogSectionProps = {
	themeSprings: ThemeSprings;
	versions: string[];
	bunVersions: string[];
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

const filterRowStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.5rem'
};

const filterLabelStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	fontSize: '0.75rem',
	gap: '0.3rem',
	opacity: 0.7
};

const inputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	padding: '0.4rem 0.6rem'
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

const paginationStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	justifyContent: 'center'
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

const expandedPayloadStyle: CSSProperties = {
	fontSize: '0.75rem',
	maxHeight: '200px',
	overflowY: 'auto',
	padding: '0.75rem',
	whiteSpace: 'pre-wrap',
	wordBreak: 'break-all'
};

const deleteButtonStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(239, 68, 68, 0.4)',
	borderRadius: '0.375rem',
	color: '#ef4444',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.7rem',
	padding: '0.2rem 0.5rem',
	transition: 'all 0.15s ease'
};

const modalStyle: CSSProperties = {
	background: `linear-gradient(160deg, #1a1a24 0%, #18181b 40%, #1c1820 100%)`,
	border: `1px solid rgba(160, 231, 229, 0.1)`,
	borderRadius: '0.75rem',
	boxShadow: `0 20px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(160, 231, 229, 0.03)`,
	color: '#fafafa',
	maxWidth: '440px',
	padding: '1.5rem',
	width: '90vw'
};

const modalTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1rem',
	fontWeight: 600,
	marginBottom: '0.5rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};

const modalDescStyle: CSSProperties = {
	color: '#a1a1aa',
	fontSize: '0.85rem',
	lineHeight: 1.5,
	marginBottom: '1rem'
};

const modalEventInfoStyle: CSSProperties = {
	background: `linear-gradient(135deg, rgba(160, 231, 229, 0.04), rgba(180, 248, 200, 0.02))`,
	border: `1px solid rgba(160, 231, 229, 0.08)`,
	borderRadius: '0.5rem',
	fontSize: '0.8rem',
	marginBottom: '1.25rem',
	padding: '0.75rem 1rem'
};

const modalEventLabelStyle: CSSProperties = {
	color: '#71717a',
	fontSize: '0.7rem',
	letterSpacing: '0.04em',
	marginBottom: '0.15rem',
	textTransform: 'uppercase'
};

const confirmLabelStyle: CSSProperties = {
	color: '#a1a1aa',
	fontSize: '0.85rem',
	lineHeight: 1.6,
	marginBottom: '0.5rem'
};

const confirmHintWrapperStyle: CSSProperties = {
	alignItems: 'center',
	background: `rgba(160, 231, 229, 0.08)`,
	border: `1px solid rgba(160, 231, 229, 0.12)`,
	borderRadius: '0.375rem',
	display: 'inline-flex',
	gap: '0.35rem',
	padding: '0.15rem 0.5rem',
	verticalAlign: 'middle'
};

const confirmHintTextStyle: CSSProperties = {
	color: primaryColor,
	fontFamily: 'monospace',
	fontSize: '0.85rem'
};

const copyButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	color: '#71717a',
	cursor: 'pointer',
	display: 'inline-flex',
	fontSize: '0.75rem',
	padding: '0.1rem'
};

const cellWithCopyStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.3rem'
};

const cellCopyButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	color: '#71717a',
	cursor: 'pointer',
	display: 'inline-flex',
	flexShrink: 0,
	fontSize: '0.65rem',
	opacity: 0.5,
	padding: '0.1rem',
	transition: 'opacity 0.15s ease'
};

const confirmInputStyle: CSSProperties = {
	background: 'rgba(255, 255, 255, 0.04)',
	border: '1px solid rgba(255, 255, 255, 0.08)',
	borderRadius: '0.5rem',
	color: '#fafafa',
	fontFamily: 'monospace',
	fontSize: '0.85rem',
	outline: 'none',
	padding: '0.5rem 0.75rem',
	width: '100%'
};

const modalButtonRowStyle: CSSProperties = {
	display: 'flex',
	gap: '0.5rem',
	justifyContent: 'flex-end'
};

const cancelButtonStyle: CSSProperties = {
	background: 'rgba(255, 255, 255, 0.04)',
	border: '1px solid rgba(255, 255, 255, 0.08)',
	borderRadius: '0.5rem',
	color: '#a1a1aa',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.85rem',
	fontWeight: 500,
	padding: '0.45rem 1rem'
};

const confirmDeleteButtonStyle: CSSProperties = {
	background: '#dc2626',
	border: '1px solid #ef4444',
	borderRadius: '0.5rem',
	color: '#fff',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.85rem',
	fontWeight: 500,
	padding: '0.45rem 1rem'
};

const checkboxStyle: CSSProperties = {
	accentColor: primaryColor,
	cursor: 'pointer',
	height: '14px',
	width: '14px'
};

const bulkDeleteBarStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	marginTop: '0.75rem'
};

const columns = [
	'event',
	'anonymous_id',
	'version',
	'os',
	'arch',
	'bun_version',
	'client_timestamp',
	'payload'
];

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

export const EventLogSection = ({
	themeSprings,
	versions,
	bunVersions
}: EventLogSectionProps) => {
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [eventFilter, setEventFilter] = useState('');
	const [versionFilter, setVersionFilter] = useState('');
	const [osFilter, setOsFilter] = useState('');
	const [bunVersionFilter, setBunVersionFilter] = useState('');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [expandedRow, setExpandedRow] = useState<string | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<TelemetryEventRow | null>(
		null
	);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [allMatchingSelected, setAllMatchingSelected] = useState(false);
	const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
	const [confirmText, setConfirmText] = useState('');
	const [copied, setCopied] = useState(false);
	const [copiedCells, setCopiedCells] = useState<Set<string>>(new Set());
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		setPage(1);
		setSelectedIds(new Set());
		setAllMatchingSelected(false);
	}, [
		eventFilter,
		versionFilter,
		osFilter,
		bunVersionFilter,
		fromDate,
		toDate,
		search
	]);

	const eventsQuery = useQuery({
		queryKey: [
			'telemetry-events',
			page,
			search,
			eventFilter,
			versionFilter,
			osFilter,
			bunVersionFilter,
			fromDate,
			toDate
		],
		queryFn: async () => {
			const { data, error } = await server.api.v1.telemetry.events.get({
				query: {
					page: String(page),
					pageSize: '50',
					search: search || undefined,
					event: eventFilter || undefined,
					version: versionFilter || undefined,
					os: osFilter || undefined,
					bun_version: bunVersionFilter || undefined,
					from: fromDate || undefined,
					to: toDate || undefined
				}
			});
			if (error) throw new Error('Failed to fetch events');
			if (!('rows' in data)) throw new Error('Invalid events response');
			return data;
		}
	});

	const deleteMutation = useMutation({
		mutationFn: async (eventId: string) => {
			const { error } = await server.api.v1.telemetry
				.events({ eventId })
				.delete();
			if (error) throw new Error('Failed to delete event');
		},
		onSuccess: () => {
			setDeleteTarget(null);
			setConfirmText('');
			queryClient.invalidateQueries({
				queryKey: ['telemetry-events']
			});
		}
	});

	const bulkDeleteMutation = useMutation({
		mutationFn: async (
			payload:
				| { ids: string[] }
				| {
						event?: string;
						version?: string;
						os?: string;
						bun_version?: string;
						search?: string;
						from?: string;
						to?: string;
				  }
		) => {
			const { error } =
				await server.api.v1.telemetry.events.delete(payload);
			if (error) throw new Error('Failed to delete events');
		},
		onSuccess: () => {
			setBulkDeleteOpen(false);
			setConfirmText('');
			setSelectedIds(new Set());
			setAllMatchingSelected(false);
			queryClient.invalidateQueries({
				queryKey: ['telemetry-events']
			});
		}
	});

	const handleCellCopy = (key: string, text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedCells((prev) => new Set(prev).add(key));
			setTimeout(() => {
				setCopiedCells((prev) => {
					const next = new Set(prev);
					next.delete(key);
					return next;
				});
			}, 1500);
		});
	};

	const handleSearchChange = (value: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setSearch(value);
			setPage(1);
		}, 300);
	};

	const handleDelete = () => {
		if (!deleteTarget || confirmText !== deleteTarget.event) return;
		deleteMutation.mutate(deleteTarget.id);
	};

	const handleBulkDelete = () => {
		if (confirmText !== bulkDeleteConfirmText) return;
		if (allMatchingSelected) {
			bulkDeleteMutation.mutate({
				event: eventFilter || undefined,
				version: versionFilter || undefined,
				os: osFilter || undefined,
				bun_version: bunVersionFilter || undefined,
				search: search || undefined,
				from: fromDate || undefined,
				to: toDate || undefined
			});
		} else {
			bulkDeleteMutation.mutate({ ids: [...selectedIds] });
		}
	};

	const toggleSelected = (id: string) => {
		if (allMatchingSelected) {
			setAllMatchingSelected(false);
			setSelectedIds(new Set());
			return;
		}
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const toggleSelectAll = () => {
		if (allMatchingSelected) {
			setAllMatchingSelected(false);
			setSelectedIds(new Set());
			return;
		}
		if (!data) return;
		const allOnPage = data.rows.map((r) => r.id);
		const allSelected = allOnPage.every((id) => selectedIds.has(id));
		if (allSelected) {
			setSelectedIds((prev) => {
				const next = new Set(prev);
				for (const id of allOnPage) next.delete(id);
				return next;
			});
		} else {
			setSelectedIds((prev) => {
				const next = new Set(prev);
				for (const id of allOnPage) next.add(id);
				return next;
			});
		}
	};

	const { data, isPending } = eventsQuery;
	const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;
	const selectedCount = allMatchingSelected
		? (data?.total ?? 0)
		: selectedIds.size;
	const bulkDeleteConfirmText = `delete ${selectedCount}`;

	const formatCell = (row: TelemetryEventRow, col: string) => {
		const value = row[col as keyof TelemetryEventRow];
		if (col === 'payload') {
			const str = JSON.stringify(value);
			return str.length > 60 ? str.slice(0, 60) + '...' : str;
		}
		if (col === 'client_timestamp' && value) {
			return new Date(String(value)).toLocaleString();
		}
		return value == null ? '-' : String(value);
	};

	return (
		<div style={gapStyle}>
			<div style={sectionTitleStyle}>Event Log</div>
			<animated.div style={sectionStyle(themeSprings)}>
				<div style={filterRowStyle}>
					<input
						type="text"
						placeholder="Search by ID, event, user..."
						style={{ ...inputStyle, flex: '1 1 200px' }}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Event type"
						style={inputStyle}
						value={eventFilter}
						onChange={(e) => setEventFilter(e.target.value)}
					/>
					<VersionSelect
						versions={versions}
						value={versionFilter}
						onChange={(v) => {
							setVersionFilter(v);
							setPage(1);
						}}
						themeSprings={themeSprings}
					/>
					<input
						type="text"
						placeholder="OS"
						style={inputStyle}
						value={osFilter}
						onChange={(e) => setOsFilter(e.target.value)}
					/>
					<VersionSelect
						versions={bunVersions}
						value={bunVersionFilter}
						onChange={(v) => {
							setBunVersionFilter(v);
							setPage(1);
						}}
						themeSprings={themeSprings}
						allLabel="All bun versions"
					/>
					<label style={filterLabelStyle}>
						From
						<input
							type="date"
							style={inputStyle}
							value={fromDate}
							onChange={(e) => setFromDate(e.target.value)}
						/>
					</label>
					<label style={filterLabelStyle}>
						To
						<input
							type="date"
							style={inputStyle}
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
						/>
					</label>
				</div>

				{(selectedIds.size > 0 || allMatchingSelected) && (
					<div style={bulkDeleteBarStyle}>
						<span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
							{selectedCount} event
							{selectedCount === 1 ? '' : 's'} selected
						</span>
						{!allMatchingSelected &&
							data &&
							data.total > data.rows.length &&
							data.rows.length > 0 &&
							data.rows.every((r) => selectedIds.has(r.id)) && (
								<button
									style={{
										...buttonStyle,
										fontSize: '0.75rem'
									}}
									onClick={() => {
										setAllMatchingSelected(true);
										setSelectedIds(new Set());
									}}
								>
									Select all {data.total} matching events
								</button>
							)}
						<button
							style={deleteButtonStyle}
							onClick={() => {
								setConfirmText('');
								setBulkDeleteOpen(true);
							}}
						>
							Delete Selected
						</button>
					</div>
				)}

				<div style={{ overflowX: 'auto', marginTop: '1rem' }}>
					<table style={tableStyle}>
						<thead>
							<tr>
								<th style={{ ...thStyle, width: '32px' }}>
									<input
										type="checkbox"
										style={checkboxStyle}
										checked={
											allMatchingSelected ||
											(!!data &&
												data.rows.length > 0 &&
												data.rows.every((r) =>
													selectedIds.has(r.id)
												))
										}
										onChange={toggleSelectAll}
									/>
								</th>
								{columns.map((col) => (
									<th key={col} style={thStyle}>
										{col}
									</th>
								))}
								<th style={thStyle} />
							</tr>
						</thead>
						{isPending ? (
							<tbody>
								<tr>
									<td
										colSpan={columns.length + 2}
										style={{
											opacity: 0.5,
											padding: '2rem',
											textAlign: 'center'
										}}
									>
										Loading events...
									</td>
								</tr>
							</tbody>
						) : !data || data.rows.length === 0 ? (
							<tbody>
								<tr>
									<td
										colSpan={columns.length + 2}
										style={{
											opacity: 0.5,
											padding: '2rem',
											textAlign: 'center'
										}}
									>
										No events found
									</td>
								</tr>
							</tbody>
						) : (
							data.rows.map((row) => (
								<tbody key={row.id}>
									<tr
										style={{ cursor: 'pointer' }}
										onClick={() =>
											setExpandedRow(
												expandedRow === row.id
													? null
													: row.id
											)
										}
									>
										<td style={tdStyle}>
											<input
												type="checkbox"
												style={checkboxStyle}
												checked={
													allMatchingSelected ||
													selectedIds.has(row.id)
												}
												onClick={(e) =>
													e.stopPropagation()
												}
												onChange={() =>
													toggleSelected(row.id)
												}
											/>
										</td>
										{columns.map((col) => {
											const copyKey = `${row.id}-${col}`;
											const isCopyable =
												col === 'event' ||
												col === 'anonymous_id';
											return (
												<td key={col} style={tdStyle}>
													{isCopyable ? (
														<div
															style={
																cellWithCopyStyle
															}
														>
															<span
																style={{
																	overflow:
																		'hidden',
																	textOverflow:
																		'ellipsis',
																	whiteSpace:
																		'nowrap'
																}}
															>
																{formatCell(
																	row,
																	col
																)}
															</span>
															<button
																style={{
																	...cellCopyButtonStyle,
																	opacity:
																		copiedCells.has(
																			copyKey
																		)
																			? 1
																			: 0.5
																}}
																title={`Copy ${col}`}
																onClick={(
																	e
																) => {
																	e.stopPropagation();
																	handleCellCopy(
																		copyKey,
																		String(
																			row[
																				col as keyof TelemetryEventRow
																			] ??
																				''
																		)
																	);
																}}
															>
																{copiedCells.has(
																	copyKey
																) ? (
																	<LuCopyCheck
																		color={
																			primaryColor
																		}
																	/>
																) : (
																	<FiCopy />
																)}
															</button>
														</div>
													) : (
														formatCell(row, col)
													)}
												</td>
											);
										})}
										<td style={tdStyle}>
											<button
												style={deleteButtonStyle}
												onClick={(e) => {
													e.stopPropagation();
													setConfirmText('');
													setDeleteTarget(row);
												}}
											>
												Delete
											</button>
										</td>
									</tr>
									{expandedRow === row.id && (
										<tr key={`${row.id}-expanded`}>
											<td
												colSpan={columns.length + 2}
												style={expandedPayloadStyle}
											>
												{JSON.stringify(
													row.payload,
													null,
													2
												)}
											</td>
										</tr>
									)}
								</tbody>
							))
						)}
					</table>
				</div>

				{totalPages > 1 && (
					<div style={{ ...paginationStyle, marginTop: '1rem' }}>
						<button
							style={buttonStyle}
							disabled={page <= 1}
							onClick={() => setPage((p) => p - 1)}
						>
							Prev
						</button>
						<span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
							Page {page} of {totalPages} ({data?.total} total)
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

			<Modal
				isOpen={deleteTarget !== null}
				onClose={() => {
					setDeleteTarget(null);
					setConfirmText('');
					setCopied(false);
				}}
				style={modalStyle}
			>
				<div style={modalTitleStyle}>Delete Event</div>
				<div style={modalDescStyle}>
					This action is permanent and cannot be undone.
				</div>
				{deleteTarget && (
					<>
						<div style={modalEventInfoStyle}>
							<div style={modalEventLabelStyle}>Event</div>
							<div
								style={{
									fontWeight: 500,
									marginBottom: '0.5rem'
								}}
							>
								{deleteTarget.event}
							</div>
							<div style={modalEventLabelStyle}>Anonymous ID</div>
							<div
								style={{
									fontFamily: 'monospace',
									fontSize: '0.75rem',
									opacity: 0.8
								}}
							>
								{deleteTarget.anonymous_id}
							</div>
						</div>
						<div style={{ marginBottom: '1.25rem' }}>
							<div style={confirmLabelStyle}>
								Type{' '}
								<span style={confirmHintWrapperStyle}>
									<span style={confirmHintTextStyle}>
										{deleteTarget.event}
									</span>
									<button
										style={copyButtonStyle}
										title="Copy to clipboard"
										onClick={() => {
											navigator.clipboard
												.writeText(deleteTarget.event)
												.then(() => {
													setCopied(true);
													setTimeout(
														() => setCopied(false),
														1500
													);
												});
										}}
									>
										{copied ? (
											<LuCopyCheck color={primaryColor} />
										) : (
											<FiCopy />
										)}
									</button>
								</span>{' '}
								to confirm
							</div>
							<input
								type="text"
								value={confirmText}
								onChange={(e) => setConfirmText(e.target.value)}
								placeholder={deleteTarget.event}
								style={confirmInputStyle}
								autoFocus
							/>
						</div>
					</>
				)}
				<div style={modalButtonRowStyle}>
					<button
						style={cancelButtonStyle}
						onClick={() => {
							setDeleteTarget(null);
							setConfirmText('');
						}}
					>
						Cancel
					</button>
					<button
						style={{
							...confirmDeleteButtonStyle,
							opacity:
								deleteMutation.isPending ||
								confirmText !== deleteTarget?.event
									? 0.4
									: 1,
							cursor:
								confirmText !== deleteTarget?.event
									? 'not-allowed'
									: 'pointer'
						}}
						disabled={
							deleteMutation.isPending ||
							confirmText !== deleteTarget?.event
						}
						onClick={handleDelete}
					>
						{deleteMutation.isPending
							? 'Deleting...'
							: 'Delete Event'}
					</button>
				</div>
			</Modal>

			<Modal
				isOpen={bulkDeleteOpen}
				onClose={() => {
					setBulkDeleteOpen(false);
					setConfirmText('');
					setCopied(false);
				}}
				style={modalStyle}
			>
				<div style={modalTitleStyle}>Delete Multiple Events</div>
				<div style={modalDescStyle}>
					You are about to permanently delete {selectedCount} event
					{selectedCount === 1 ? '' : 's'}. This action cannot be
					undone.
				</div>
				<div style={{ marginBottom: '1.25rem' }}>
					<div style={confirmLabelStyle}>
						Type{' '}
						<span style={confirmHintWrapperStyle}>
							<span style={confirmHintTextStyle}>
								{bulkDeleteConfirmText}
							</span>
							<button
								style={copyButtonStyle}
								title="Copy to clipboard"
								onClick={() => {
									navigator.clipboard
										.writeText(bulkDeleteConfirmText)
										.then(() => {
											setCopied(true);
											setTimeout(
												() => setCopied(false),
												1500
											);
										});
								}}
							>
								{copied ? (
									<LuCopyCheck color={primaryColor} />
								) : (
									<FiCopy />
								)}
							</button>
						</span>{' '}
						to confirm
					</div>
					<input
						type="text"
						value={confirmText}
						onChange={(e) => setConfirmText(e.target.value)}
						placeholder={bulkDeleteConfirmText}
						style={confirmInputStyle}
						autoFocus
					/>
				</div>
				<div style={modalButtonRowStyle}>
					<button
						style={cancelButtonStyle}
						onClick={() => {
							setBulkDeleteOpen(false);
							setConfirmText('');
						}}
					>
						Cancel
					</button>
					<button
						style={{
							...confirmDeleteButtonStyle,
							opacity:
								bulkDeleteMutation.isPending ||
								confirmText !== bulkDeleteConfirmText
									? 0.4
									: 1,
							cursor:
								confirmText !== bulkDeleteConfirmText
									? 'not-allowed'
									: 'pointer'
						}}
						disabled={
							bulkDeleteMutation.isPending ||
							confirmText !== bulkDeleteConfirmText
						}
						onClick={handleBulkDelete}
					>
						{bulkDeleteMutation.isPending
							? 'Deleting...'
							: `Delete ${selectedCount} Event${selectedCount === 1 ? '' : 's'}`}
					</button>
				</div>
			</Modal>
		</div>
	);
};
