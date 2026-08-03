import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const IslandsOverviewList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'render normal SSR pages and drop islands in where you need client behavior.',
				term: 'Host pages stay simple'
			},
			{
				description:
					'a React host can render Vue, Svelte, or Angular islands.',
				term: 'Cross-framework is normal'
			},
			{
				description:
					'islands do not take state keys in their props. Shared state comes from importing the same island store across components.',
				term: 'State is store-first'
			},
			{
				description: (
					<>
						AbsoluteJS uses <code>zustand/vanilla</code> underneath
						and exposes framework-specific selectors on top.
					</>
				),
				term: 'Zustand powers the store layer'
			}
		]}
		themeSprings={themeSprings}
	/>
);
