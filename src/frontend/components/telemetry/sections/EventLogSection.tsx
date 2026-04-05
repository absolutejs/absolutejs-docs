import { TELEMETRY_EVENT_LOG_LAYOUT } from '../../../../constants';
import { animated } from '@react-spring/web';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { server } from '../../../utils/edenTreaty';
import { BulkDeleteBar } from './eventLog/BulkDeleteBar';
import { BulkDeleteModal } from './eventLog/BulkDeleteModal';
import { DeleteEventModal } from './eventLog/DeleteEventModal';
import { EventLogFilterRow } from './eventLog/EventLogFilterRow';
import { EventLogPagination } from './eventLog/EventLogPagination';
import { EventLogTable } from './eventLog/EventLogTable';
import {
	EventLogColumn,
	gapStyle,
	sectionStyle,
	sectionTitleStyle
} from './eventLog/eventLogStyles';
import { TelemetryEventRow } from './eventLog/eventLogTypes';

type EventLogSectionProps = {
	themeSprings: ThemeSprings;
	versions: string[];
};

export const EventLogSection = ({
	themeSprings,
	versions
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
					bun_version: bunVersionFilter || undefined,
					event: eventFilter || undefined,
					from: fromDate || undefined,
					os: osFilter || undefined,
					page: String(page),
					pageSize: '50',
					search: search || undefined,
					to: toDate || undefined,
					version: versionFilter || undefined
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
		const copyCell = async () => {
			try {
				await navigator.clipboard.writeText(text);
				setCopiedCells((prev) => new Set(prev).add(key));
				setTimeout(() => {
					setCopiedCells((prev) => {
						const next = new Set(prev);
						next.delete(key);

						return next;
					});
				}, TELEMETRY_EVENT_LOG_LAYOUT.copyFeedbackDurationMs);
			} catch {
				// Clipboard access can fail outside secure contexts.
			}
		};

		void copyCell();
	};

	const handleSearchChange = (value: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setSearch(value);
			setPage(1);
		}, TELEMETRY_EVENT_LOG_LAYOUT.searchDebounceMs);
	};

	const handleDelete = () => {
		if (!deleteTarget || confirmText !== deleteTarget.event) return;
		deleteMutation.mutate(deleteTarget.id);
	};

	const handleBulkDelete = () => {
		if (confirmText !== bulkDeleteConfirmText) return;
		if (allMatchingSelected) {
			bulkDeleteMutation.mutate({
				bun_version: bunVersionFilter || undefined,
				event: eventFilter || undefined,
				from: fromDate || undefined,
				os: osFilter || undefined,
				search: search || undefined,
				to: toDate || undefined,
				version: versionFilter || undefined
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
		const allOnPage = data.rows.map((eventRow) => eventRow.id);
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

	const toggleExpand = (id: string) => {
		setExpandedRow(expandedRow === id ? null : id);
	};

	const { data, isPending } = eventsQuery;
	const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;
	const selectedCount = allMatchingSelected
		? (data?.total ?? 0)
		: selectedIds.size;
	const bulkDeleteConfirmText = `delete ${selectedCount}`;

	const allOnPageSelected =
		data !== undefined &&
		data.rows.length > 0 &&
		data.rows.every((eventRow) => selectedIds.has(eventRow.id));

	const formatCell = (row: TelemetryEventRow, col: EventLogColumn) => {
		const value = row[col];
		if (col === 'payload') {
			const str = JSON.stringify(value);

			return str.length > TELEMETRY_EVENT_LOG_LAYOUT.payloadPreviewLength
				? `${str.slice(0, TELEMETRY_EVENT_LOG_LAYOUT.payloadPreviewLength)}...`
				: str;
		}
		if (col === 'client_timestamp' && value) {
			const raw = String(value);
			const utc = raw.endsWith('Z') ? raw : `${raw}Z`;

			return new Date(utc).toLocaleString();
		}

		return value === null || value === undefined ? '-' : String(value);
	};

	return (
		<div style={gapStyle}>
			<div style={sectionTitleStyle}>Event Log</div>
			<animated.div style={sectionStyle(themeSprings)}>
				<EventLogFilterRow
					bunVersionFilter={bunVersionFilter}
					eventFilter={eventFilter}
					fromDate={fromDate}
					onBunVersionFilterChange={(v) => {
						setBunVersionFilter(v);
						setPage(1);
					}}
					onEventFilterChange={setEventFilter}
					onFromDateChange={setFromDate}
					onOsFilterChange={setOsFilter}
					onSearchChange={handleSearchChange}
					onToDateChange={setToDate}
					onVersionFilterChange={(v) => {
						setVersionFilter(v);
						setPage(1);
					}}
					osFilter={osFilter}
					themeSprings={themeSprings}
					toDate={toDate}
					versionFilter={versionFilter}
					versions={versions}
				/>

				{(selectedIds.size > 0 || allMatchingSelected) && (
					<BulkDeleteBar
						allMatchingSelected={allMatchingSelected}
						allVisibleSelected={allOnPageSelected}
						onOpenBulkDelete={() => {
							setConfirmText('');
							setBulkDeleteOpen(true);
						}}
						onSelectAllMatching={() => {
							setAllMatchingSelected(true);
							setSelectedIds(new Set());
						}}
						selectedCount={selectedCount}
						totalMatching={data?.total ?? 0}
						visibleCount={data?.rows.length ?? 0}
					/>
				)}

				<EventLogTable
					allMatchingSelected={allMatchingSelected}
					allOnPageSelected={allOnPageSelected}
					copiedCells={copiedCells}
					expandedRow={expandedRow}
					formatCell={formatCell}
					isPending={isPending}
					onCellCopy={handleCellCopy}
					onDelete={(row) => {
						setConfirmText('');
						setDeleteTarget(row);
					}}
					onToggleExpand={toggleExpand}
					onToggleSelect={toggleSelected}
					onToggleSelectAll={toggleSelectAll}
					rows={data?.rows}
					selectedIds={selectedIds}
				/>

				{totalPages > 1 && (
					<EventLogPagination
						onPageChange={(direction) =>
							setPage((prev) =>
								direction === 'prev' ? prev - 1 : prev + 1
							)
						}
						page={page}
						totalEvents={data?.total}
						totalPages={totalPages}
					/>
				)}
			</animated.div>

			<DeleteEventModal
				confirmText={confirmText}
				deleteTarget={deleteTarget}
				isPending={deleteMutation.isPending}
				onClose={() => {
					setDeleteTarget(null);
					setConfirmText('');
				}}
				onConfirmTextChange={setConfirmText}
				onDelete={handleDelete}
			/>

			<BulkDeleteModal
				bulkDeleteConfirmText={bulkDeleteConfirmText}
				confirmText={confirmText}
				isOpen={bulkDeleteOpen}
				isPending={bulkDeleteMutation.isPending}
				onClose={() => {
					setBulkDeleteOpen(false);
					setConfirmText('');
				}}
				onConfirmTextChange={setConfirmText}
				onDelete={handleBulkDelete}
				selectedCount={selectedCount}
			/>
		</div>
	);
};
