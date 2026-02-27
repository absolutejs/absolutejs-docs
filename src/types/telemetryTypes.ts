import { ThemeSprings } from './springTypes';

export type KpiSummary = {
	totalEvents: number;
	errorRate: number;
	avgDevBuildMs: number | null;
	avgProdBuildMs: number | null;
	topFramework: string | null;
};

export type TelemetrySectionProps = {
	data: Record<string, Record<string, unknown>[]>;
	versions: string[];
	themeSprings: ThemeSprings;
	onVersionChange: (queryKey: string, version: string) => void;
	kpi: KpiSummary | null;
};
