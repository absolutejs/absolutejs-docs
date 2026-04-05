export type UniqueUser = {
	anonymous_id: string;
	total_events: number;
	first_seen: string;
	last_seen: string;
	versions: string[];
	os_list: string[];
};

export type UserEvent = {
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

export type UserEventsResponse = {
	rows: UserEvent[];
	total: number;
	page: number;
	pageSize: number;
};

export type UserLabel = {
	anonymous_id: string;
	label: string;
};
