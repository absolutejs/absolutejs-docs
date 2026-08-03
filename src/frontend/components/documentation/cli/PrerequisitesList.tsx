import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const PrerequisitesList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: <code>brew install mkcert</code>,
				term: 'macOS'
			},
			{
				description: (
					<>
						<code>sudo apt install mkcert</code> or{' '}
						<code>yay -S mkcert</code>
					</>
				),
				term: 'Linux'
			},
			{
				description: <code>choco install mkcert</code>,
				term: 'Windows'
			}
		]}
		themeSprings={themeSprings}
	/>
);
