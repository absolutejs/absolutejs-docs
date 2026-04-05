import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type ProfileInfoRowProps = {
	label: string;
	themeSprings: ThemeSprings;
	value: string;
};

export const ProfileInfoRow = ({
	label,
	value,
	themeSprings
}: ProfileInfoRowProps) => (
	<div
		style={{
			alignItems: 'flex-start',
			display: 'flex',
			gap: '1rem',
			justifyContent: 'space-between'
		}}
	>
		<animated.span
			style={{
				color: themeSprings.contrastSecondary,
				flexShrink: 0,
				fontSize: '0.8125rem',
				opacity: 0.6
			}}
		>
			{label}
		</animated.span>
		<animated.span
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '0.8125rem',
				fontWeight: 500,
				overflow: 'hidden',
				textAlign: 'right',
				textOverflow: 'ellipsis',
				wordBreak: 'break-all'
			}}
		>
			{value}
		</animated.span>
	</div>
);
