import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ErrorBoundariesConventionFilesList = ({
	themeSprings
}: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'default error page for all pages in that framework directory',
				term: 'error.tsx'
			},
			{
				description:
					'page-specific error boundary that overrides the default for that page only',
				term: 'Page.error.tsx'
			},
			{
				description: 'custom 404 page rendered when no route matches',
				term: 'not-found.tsx'
			},
			{
				description: (
					<>
						universal HTML fallback shared across frameworks. Tokens{' '}
						<code>{'{{name}}'}</code>, <code>{'{{message}}'}</code>,
						and <code>{'{{stack}}'}</code> are replaced server-side
					</>
				),
				term: 'error.html'
			},
			{
				description: 'universal 404 fallback for any framework',
				term: 'not-found.html'
			}
		]}
		themeSprings={themeSprings}
	/>
);
