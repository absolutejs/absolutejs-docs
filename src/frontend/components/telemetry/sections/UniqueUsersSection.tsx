import { TELEMETRY_UNIQUE_USERS_LAYOUT } from '../../../../constants';
import { animated } from '@react-spring/web';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { server } from '../../../utils/edenTreaty';
import { UserTable } from './uniqueUsers/UserTable';
import { UniqueUser } from './uniqueUsers/uniqueUsersTypes';
import {
	HALF,
	gapStyle,
	inputStyle,
	sectionStyle,
	sectionTitleStyle,
	UserColumn
} from './uniqueUsers/uniqueUsersStyles';

type UniqueUsersSectionProps = {
	themeSprings: ThemeSprings;
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
		const labelRows = labelsQuery.data ?? [];
		for (const row of labelRows) {
			map[row.anonymous_id] = row.label;
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
		}, TELEMETRY_UNIQUE_USERS_LAYOUT.searchDebounceMs);
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

	const handleStartEdit = (anonymousId: string, currentLabel: string) => {
		setEditingId(anonymousId);
		setEditValue(currentLabel);
	};

	const handleBlur = (anonymousId: string) => {
		setTimeout(() => {
			setEditingId((curr) => (curr === anonymousId ? null : curr));
		}, TELEMETRY_UNIQUE_USERS_LAYOUT.blurCloseDelayMs);
	};

	const isLoading = usersQuery.isPending || labelsQuery.isPending;
	const users = useMemo<UniqueUser[]>(
		() => usersQuery.data ?? [],
		[usersQuery.data]
	);

	const formatCell = (row: UniqueUser, col: UserColumn) => {
		if (col === 'label') {
			return labels[row.anonymous_id] ?? '';
		}
		if (col === 'first_seen' || col === 'last_seen') {
			const raw = row[col];
			const utc = raw.endsWith('Z') ? raw : `${raw}Z`;

			return new Date(utc).toLocaleString();
		}
		if (col === 'versions') {
			return (row.versions ?? []).filter(Boolean).join(', ') || '-';
		}
		if (col === 'os_list') {
			return (row.os_list ?? []).filter(Boolean).join(', ') || '-';
		}
		const value = row.total_events;

		return value === null || value === undefined ? '-' : String(value);
	};

	const filteredUsers = useMemo(() => {
		if (!search) return users;
		const lower = search.toLowerCase();

		return users.filter(
			(userRecord) =>
				userRecord.anonymous_id.toLowerCase().includes(lower) ||
				(labels[userRecord.anonymous_id] ?? '')
					.toLowerCase()
					.includes(lower)
		);
	}, [users, search, labels]);

	const toggleExpand = (anonymousId: string) => {
		setExpandedUser(expandedUser === anonymousId ? null : anonymousId);
	};

	return (
		<div style={gapStyle}>
			<div style={sectionTitleStyle}>Unique Users</div>
			<animated.div style={sectionStyle(themeSprings)}>
				<input
					onChange={(event) => handleSearchChange(event.target.value)}
					placeholder="Search by anonymous ID or label..."
					style={inputStyle}
					type="text"
				/>

				{isLoading ? (
					<div
						style={{
							opacity: HALF,
							padding: '2rem',
							textAlign: 'center'
						}}
					>
						Loading users...
					</div>
				) : (
					<UserTable
						editingId={editingId}
						editValue={editValue}
						expandedUser={expandedUser}
						formatCell={formatCell}
						labelInputRef={labelInputRef}
						labels={labels}
						onBlur={handleBlur}
						onCancelEdit={() => setEditingId(null)}
						onEditValueChange={setEditValue}
						onSave={saveLabel}
						onStartEdit={handleStartEdit}
						onToggleExpand={toggleExpand}
						themeSprings={themeSprings}
						users={filteredUsers}
					/>
				)}
			</animated.div>
		</div>
	);
};
