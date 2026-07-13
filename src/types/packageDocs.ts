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
	title: string;
};

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
	name: string;
	npmName: string;
	tagline: string;
	version: string;
	view: string;
};

export type PackageDocData = {
	adapterGroups?: PackageAdapterGroup[];
	category: PackageCategory;
	description: string;
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
