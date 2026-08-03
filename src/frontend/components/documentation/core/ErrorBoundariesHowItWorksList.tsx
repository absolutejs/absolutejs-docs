import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ErrorBoundariesHowItWorksList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						the build scans for <code>error.tsx</code>,{' '}
						<code>*.error.tsx</code>, <code>not-found.tsx</code>,
						and the universal <code>error.html</code> /{' '}
						<code>not-found.html</code> fallbacks
					</>
				),
				term: 'Auto-detection'
			},
			{
				description: (
					<>
						page components receive a flat{' '}
						<code>ErrorPageProps</code> shape (<code>name</code>,{' '}
						<code>message</code>, optional <code>stack</code>).
						Helper functions <code>defineRenderErrorPage</code> and{' '}
						<code>defineRenderNotFoundPage</code> type the return as
						a real HTML document
					</>
				),
				term: 'Typed render contract'
			},
			{
				description:
					'when a page throws during server-side rendering, the error is caught and the matching convention component receives the typed props',
				term: 'SSR catch'
			},
			{
				description:
					'the error page hydrates on the client just like any other page',
				term: 'Client hydration'
			}
		]}
		themeSprings={themeSprings}
	/>
);
