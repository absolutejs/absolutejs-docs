export type PlaybookPackageRole = {
	detail: string;
	name: string;
	phase: 'operate' | 'production' | 'required';
	role: string;
	view: string;
};

export type PlaybookSubstitution = {
	development: string;
	production: string;
	reason: string;
};

export type PlaybookFailure = {
	check: string;
	ifTrue: string;
	problem: string;
};

export type OutcomePlaybook = {
	description: string;
	expectedResults: string[];
	failures: PlaybookFailure[];
	fileTree: string;
	id: string;
	installCommand: string;
	packages: PlaybookPackageRole[];
	prerequisites: string[];
	quickstart: Array<{
		detail: string;
		label: string;
		verify: string;
	}>;
	substitutions: PlaybookSubstitution[];
	title: string;
};
