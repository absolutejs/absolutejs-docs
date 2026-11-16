import { DataTable } from './DataTable';
import { vueCheckResults } from './results';

const times = (before: number, after: number) =>
	`${(before / after).toFixed(1)}×`;
const yes = (value: boolean) => (value ? '✓' : '✗');
const { codegen, projects } = vueCheckResults;
const MS_PER_SECOND = 1000;
const seconds = (milliseconds: number) =>
	`${(milliseconds / MS_PER_SECOND).toFixed(2)} s`;

export const CodegenTable = () => (
	<DataTable
		columns={[
			'Project',
			'Vue files',
			'JavaScript codegen',
			'Native codegen',
			'Faster'
		]}
		rows={codegen.map((project) => ({
			cells: [
				project.name,
				project.files,
				seconds(project.javascriptMs),
				seconds(project.nativeMs),
				times(project.javascriptMs, project.nativeMs)
			],
			key: project.name
		}))}
	/>
);

export const PhaseTable = () => (
	<DataTable
		columns={['Project', 'Vue codegen', 'bun check', 'Mapping']}
		rows={projects.map((project) => ({
			cells: [
				project.name,
				`${project.phases.codegenS} s · ${project.phases.codegenMB} MB`,
				`${project.phases.checkS} s · ${project.phases.checkMB} MB`,
				`${project.phases.mapS} s · ${project.phases.mapMB} MB`
			],
			key: project.name
		}))}
	/>
);

export const ProofTable = () => (
	<DataTable
		columns={[
			'Project',
			'vue-tsc',
			'Errors',
			'Same as vue-tsc',
			'bun check = tsc 7',
			'TypeScript 7 changes'
		]}
		rows={projects.map((project) => ({
			cells: [
				project.name,
				project.vueTsc.version,
				project.errors,
				yes(project.identical),
				yes(project.bunMatchesTsc7),
				project.typeScript7Changes
			],
			key: project.name
		}))}
	/>
);
