import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type SidebarHeadingProps = {
	heading: string;
	themeSprings: ThemeSprings;
};

export const SidebarHeading = ({
	heading,
	themeSprings
}: SidebarHeadingProps) => (
	<animated.div
		style={{
			color: themeSprings.contrastSecondary,
			fontSize: '0.7rem',
			fontWeight: 700,
			letterSpacing: '0.08em',
			marginTop: '1.25rem',
			padding: '0.25rem 0.75rem 0.35rem',
			textTransform: 'uppercase',
			whiteSpace: 'nowrap'
		}}
	>
		{heading}
	</animated.div>
);
