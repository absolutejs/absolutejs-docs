export type PackageCategory =
	| 'AI'
	| 'Auth & Identity'
	| 'Commerce & Growth'
	| 'Data & Sync'
	| 'Dev Tools'
	| 'Frontend & UX'
	| 'Messaging'
	| 'Observability'
	| 'On-chain'
	| 'Platform & Infra'
	| 'Voice & Media';

export type PackageStatus = 'alpha' | 'beta' | 'stable';

export type PackageFeature = {
	description: string;
	details?: string[];
	title: string;
};

export type PackageApiSymbol = {
	description: string;
	kind: string;
	name: string;
	signature: string;
};

export type PackageApiEntrypoint = {
	entryPoint: string;
	symbols: PackageApiSymbol[];
};

export type PackageFlowExplanation = {
	description: string;
	id: string;
	kind: 'flow' | 'lifecycle';
	steps: Array<{
		detail: string;
		label: string;
	}>;
	title: string;
};

export type PackageDecisionExplanation = {
	description: string;
	id: string;
	kind: 'decision';
	options: Array<{
		bestFor: string;
		label: string;
		requirements: string[];
		tradeoffs: string;
	}>;
	title: string;
};

export type PackageMatrixExplanation = {
	columns: string[];
	description: string;
	id: string;
	kind: 'matrix';
	rows: Array<{
		label: string;
		values: string[];
	}>;
	title: string;
};

export type PackageExplanation =
	| PackageDecisionExplanation
	| PackageFlowExplanation
	| PackageMatrixExplanation;

export type PackageCodeSample = {
	code: string;
	description: string;
	heading: string;
	language: string;
};

export type PackageAdapterGroup = {
	description: string;
	heading: string;
	items: {
		description: string;
		href?: string;
		name: string;
		version?: string;
	}[];
};

export type PackageNote = {
	body: string;
	title: string;
	variant: 'info' | 'note' | 'success' | 'warning';
};

export type PackageLink = {
	href: string;
	label: string;
};

export type PackageCatalogEntry = {
	category: PackageCategory;
	guideView?: string;
	kind: 'monorepo' | 'package' | 'repository';
	name: string;
	npmName: string | null;
	private: boolean;
	searchText: string;
	sourceDirectory: string;
	status: PackageStatus;
	subpackageCount: number;
	tagline: string;
	version: string | null;
	view: string;
};

export type PackageDocData = {
	adapterGroups?: PackageAdapterGroup[];
	api?: PackageApiEntrypoint[];
	category: PackageCategory;
	description: string;
	explanations?: PackageExplanation[];
	features: PackageFeature[];
	installCommand: string;
	links?: PackageLink[];
	name: string;
	notes?: PackageNote[];
	npmName: string;
	samples: PackageCodeSample[];
	status: PackageStatus;
	tagline: string;
	version: string;
};
