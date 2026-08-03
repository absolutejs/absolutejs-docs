import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const AssetFeatureList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Built files include content hashes for cache busting',
				term: 'Hashed filenames'
			},
			{
				description:
					'All asset paths are automatically updated to the build output',
				term: 'Path rewriting'
			},
			{
				description: 'Assets are optimized and minified for production',
				term: 'Bundling'
			}
		]}
		themeSprings={themeSprings}
	/>
);
