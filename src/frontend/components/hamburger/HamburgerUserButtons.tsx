import { animated } from '@react-spring/web';
import { User } from '../../../../db/schema';
import { ThemeColors } from '../../../types/types';
import { useThemeStore } from '../../hooks/useThemeStore';
import { buttonStyle } from '../../styles/styles';
import { ProfilePicture } from '../utils/ProfilePicture';

type HamburgerUserButtonsProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	openModal: () => void;
	themeSprings: ThemeColors;
};

export const HamburgerUserButtons = ({
	user,
	handleSignOut,
	openModal,
	themeSprings
}: HamburgerUserButtonsProps) => {
	const theme = useThemeStore((state) => state.theme);

	return (
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%'
			}}
		>
			<animated.button
				onClick={user ? () => handleSignOut() : openModal}
				style={buttonStyle({
					backgroundColor: themeSprings.themeTertiary,
					color: themeSprings.contrastPrimary,
					width: '100%'
				})}
			>
				{user ? 'Sign Out' : 'Login'}
			</animated.button>
			{user !== undefined && (
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						gap: '2rem',
						marginTop: '1rem'
					}}
				>
					<animated.a href="/portal">
						<ProfilePicture
							themeSprings={themeSprings}
							userImage={
								typeof user.metadata?.profile_picture ===
								'string'
									? user.metadata.profile_picture
									: undefined
							}
							backupImage={
								theme === 'dark'
									? '/assets/svg/default-profile-icon-light.svg'
									: '/assets/svg/default-profile-icon.svg'
							}
							width="4rem"
							height="4rem"
						/>
					</animated.a>
					<animated.span
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '1.2rem',
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						{typeof user.metadata?.given_name === 'string'
							? user.metadata.given_name
							: ''}{' '}
						{typeof user.metadata?.family_name === 'string'
							? user.metadata.family_name
							: ''}
					</animated.span>
				</div>
			)}
		</div>
	);
};
