import { PROVIDER_STATUSES } from '../../constants';

export type LegendData = {
	status: (typeof PROVIDER_STATUSES)[number];
	message: string;
};

export const legendData: LegendData[] = [
	{
		status: 'tested',
		message: 'Verified routes actively working and community-tested.'
	},
	{
		status: 'untested',
		message: 'Pending external or restricted access.'
	},
	{
		status: 'testing',
		message: 'Feature currently under development on our end.'
	},
	{
		status: 'missing',
		message: 'Functionality not supported by the provider.'
	},
	{
		status: 'failed',
		message: 'Library or endpoint issues (not user error).'
	}
];
