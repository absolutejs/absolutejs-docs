import { ThemeSprings } from '../../../../types/springTypes';
import { DefinitionGrid, DefinitionItem } from '../../utils/DefinitionGrid';

const howItWorksItems: DefinitionItem[] = [
	{
		description: (
			<>
				A <code>user_session_id</code> cookie is created on first
				request
			</>
		),
		term: 'Automatic Session ID'
	},
	{
		description:
			'State is stored in memory on the server, keyed by session ID',
		term: 'Server-Side Storage'
	},
	{
		description:
			'Each session ID maps to a completely separate state object',
		term: 'Isolation'
	}
];

type ScopedStateHowItWorksListProps = {
	themeSprings: ThemeSprings;
};

export const ScopedStateHowItWorksList = ({
	themeSprings
}: ScopedStateHowItWorksListProps) => (
	<DefinitionGrid items={howItWorksItems} themeSprings={themeSprings} />
);
