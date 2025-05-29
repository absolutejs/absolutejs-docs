import { PROVIDER_STATUSES } from '../../../constants';
import { TestedBadge } from '../testing/badges/TestedBadge';
import { MissingBadge } from '../testing/badges/MissingBadge';
import { FailedBadge } from '../testing/badges/FailedBadge';
import { TestingBadge } from '../testing/badges/TestingBadge';
import { UntestedBadge } from '../testing/badges/UntestedBadge';

export const renderBadge = (status: (typeof PROVIDER_STATUSES)[number]) => {
	switch (status) {
		case 'tested':
			return <TestedBadge />;
		case 'untested':
			return <UntestedBadge />;
		case 'testing':
			return <TestingBadge />;
		case 'missing':
			return <MissingBadge />;
		default:
			return <FailedBadge />;
	}
};
