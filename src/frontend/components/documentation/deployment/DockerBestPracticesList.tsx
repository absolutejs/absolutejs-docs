import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const DockerBestPracticesList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Ensures reproducible builds by using exact versions from bun.lockb',
				term: 'Use --frozen-lockfile'
			},
			{
				description:
					'Separate build and runtime stages to reduce final image size',
				term: 'Multi-stage builds'
			},
			{
				description: 'Add a non-root user for better security',
				term: "Don't run as root"
			},
			{
				description:
					'Exclude node_modules, .git, and other unnecessary files',
				term: 'Use .dockerignore'
			},
			{
				description:
					'Add HEALTHCHECK instruction for container orchestration',
				term: 'Health checks'
			}
		]}
		themeSprings={themeSprings}
	/>
);
