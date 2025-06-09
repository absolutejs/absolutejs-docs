import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/types';
import { CopyButton } from '../utils/CopyButton';

export const CreateButton = ({ themeSprings }: ThemeProps) => (
	<animated.div
		style={{
			alignItems: 'center',
			backgroundColor: themeSprings.themePrimary,
			border: `1px solid ${themeSprings.themeSecondary}`,
			borderRadius: '16px',
			color: themeSprings.contrastPrimary,
			display: 'flex',
			justifyContent: 'center',
			padding: '10px 20px'
		}}
	>
		<code
			style={{
				fontSize: '1.2rem',
				marginRight: '2rem'
			}}
		>
			bun create absolutejs
		</code>
		<CopyButton text="bun create absolutejs" />
	</animated.div>
);
