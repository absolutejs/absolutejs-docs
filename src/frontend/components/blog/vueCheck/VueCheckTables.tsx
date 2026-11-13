import { DataTable } from './DataTable';
import { vueCheckResults } from './results';

const times = (before: number, after: number) =>
	`${(before / after).toFixed(1)}×`;
const yes = (value: boolean) => (value ? '✓' : '✗');
const { projects } = vueCheckResults;

export const PerformanceTable = () => (
	<DataTable
		columns={[
			'Project',
			'Vue files',
			'vue-tsc',
			'vue-check',
			'Faster',
			'Less memory'
		]}
		rows={projects.map((project) => ({
			cells: [
				project.name,
				project.phases.vueFiles,
				`${project.vueTsc.s} s · ${project.vueTsc.mb} MB`,
				`${project.vueCheck.s} s · ${project.vueCheck.mb} MB`,
				times(project.vueTsc.s, project.vueCheck.s),
				times(project.vueTsc.mb, project.vueCheck.mb)
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
