export type TelemetryEventRow = {
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

export type EventLogResponse = {
	rows: TelemetryEventRow[];
	total: number;
	page: number;
	pageSize: number;
};
