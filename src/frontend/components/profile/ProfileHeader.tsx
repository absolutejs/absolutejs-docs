import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { ProfilePicture } from '../utils/ProfilePicture';

type ProfileHeaderProps = {
	displayName: string | undefined;
	initials: string;
	themeSprings: ThemeSprings;
	userImage: string | undefined;
};

export const ProfileHeader = ({
	displayName,
	initials,
	themeSprings,
	userImage
}: ProfileHeaderProps) => (
	<div
		style={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
			marginBottom: '2rem'
		}}
	>
		<ProfilePicture
			height="5rem"
			initials={initials}
			themeSprings={themeSprings}
			userImage={userImage}
			width="5rem"
		/>
		{displayName && (
			<animated.h1
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.5rem',
					fontWeight: 700,
					letterSpacing: '-0.025em',
					textAlign: 'center'
				}}
			>
				{displayName}
			</animated.h1>
		)}
	</div>
);
