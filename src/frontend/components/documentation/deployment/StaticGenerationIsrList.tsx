import { listStyle } from '../../../styles/docsStyles';
import { IsrListItem } from './IsrListItem';

export const StaticGenerationIsrList = () => (
	<ul style={listStyle}>
		<IsrListItem label="Without revalidate">
			: pure SSG: pages are rendered once at build time and never change
		</IsrListItem>
		<IsrListItem label="With revalidate">
			: ISR: stale pages are served immediately while a fresh version
			renders in the background
		</IsrListItem>
	</ul>
);
