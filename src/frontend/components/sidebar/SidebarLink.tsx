import {
	animated,
	AnimatedComponent,
	SpringRef,
	SpringValue,
	useSpring
} from '@react-spring/web';
import { IconType } from 'react-icons';
import { DocsView, ThemeSprings } from '../../../types/types';
import { lightTertiaryColor, primaryColor } from '../../styles/colors';

type SidebarLinkProps = {
	icon?: AnimatedComponent<IconType>;
	label: string;
	themeSprings: ThemeSprings;
	linkSprings?: {
		borderColor: SpringValue<string>;
	};
	linksApi?: SpringRef<{
		borderColor: string;
	}>;
	id: DocsView;
	index: number;
	navigateToView: (newView: DocsView) => void;
};

export const SidebarLink = ({
	icon,
	linkSprings,
	linksApi,
	index,
	id,
	navigateToView,
	label,
	themeSprings
}: SidebarLinkProps) => {
	const Icon = icon;
	const isOverview = id === 'overview';

	return (
		<animated.button
			style={{
				alignItems: 'center',
				backgroundColor: 'transparent',
				border: 'none',
				borderColor: linkSprings?.borderColor,
				borderLeft: !isOverview ? '3px solid' : 'none',
				color: themeSprings.contrastSecondary,
				cursor: 'pointer',
				display: 'flex',
				marginLeft: !isOverview ? '0.5rem' : '0',
				paddingLeft: !isOverview ? '1rem' : '0',
				width: '100%'
			}}
			onClick={() => {
				navigateToView(id);
				linksApi?.start((i) => {
					if (i === index) {
						return { borderColor: primaryColor };
					}

					return { borderColor: lightTertiaryColor };
				});
			}}
		>
			{Icon && <Icon />}
			<animated.span
				style={{
					alignItems: 'center',
					color: themeSprings.contrastSecondary,
					display: 'flex',
					fontSize: '1rem',
					fontWeight: isOverview ? 'bold' : 'normal',
					marginLeft: icon ? '0.5rem' : '0',
					padding: '0.5rem 0',
					textDecoration: 'none'
				}}
			>
				{label}
			</animated.span>
		</animated.button>
	);
};
