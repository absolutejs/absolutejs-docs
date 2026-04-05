import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { handleSignOut } from '../../utils/authFunctions';

type SignOutButtonProps = {
	themeSprings: ThemeSprings;
};

export const SignOutButton = ({ themeSprings }: SignOutButtonProps) => (
	<animated.div
		style={{
			borderTop: '1px solid',
			borderTopColor: themeSprings.themeTertiary,
			marginTop: '1.5rem',
			paddingTop: '1.5rem'
		}}
	>
		<animated.button
			onClick={() => handleSignOut()}
			style={{
				background: 'linear-gradient(135deg, #6366F1, #818CF8)',
				border: 'none',
				borderRadius: '8px',
				color: '#FFFFFF',
				cursor: 'pointer',
				fontSize: '0.875rem',
				fontWeight: 600,
				padding: '0.625rem 1.25rem',
				width: '100%'
			}}
		>
			Sign out
		</animated.button>
	</animated.div>
);
