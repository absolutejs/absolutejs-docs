import { PROFILE_PICTURE_LAYOUT } from '../../../constants';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type ProfilePictureProps = {
	userImage: string | null | undefined;
	initials?: string;
	width?: string;
	height?: string;
	themeSprings: ThemeSprings;
};

const getInitialsFontSize = (size: string) => {
	const numericSize = parseFloat(size);

	return `${numericSize / PROFILE_PICTURE_LAYOUT.initialsFontSizeDivisor}rem`;
};

export const ProfilePicture = ({
	userImage,
	initials = '?',
	width = '2rem',
	height = '2rem',
	themeSprings
}: ProfilePictureProps) => {
	if (userImage) {
		return (
			<animated.img
				alt="Profile"
				src={userImage}
				style={{
					backgroundColor: themeSprings.themeTertiary,
					borderRadius: '50%',
					height,
					objectFit: 'cover',
					width
				}}
			/>
		);
	}

	return (
		<animated.div
			style={{
				alignItems: 'center',
				background: 'linear-gradient(135deg, #6366F1, #818CF8)',
				borderRadius: '50%',
				color: '#FFFFFF',
				display: 'flex',
				fontSize: getInitialsFontSize(width),
				fontWeight: 600,
				height,
				justifyContent: 'center',
				letterSpacing: '0.01em',
				lineHeight: 1,
				userSelect: 'none',
				width
			}}
		>
			{initials}
		</animated.div>
	);
};
