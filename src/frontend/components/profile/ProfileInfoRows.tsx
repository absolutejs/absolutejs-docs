import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { ProfileInfoRow } from './ProfileInfoRow';

type ProfileInfoRowsProps = {
	memberSince: string;
	metadataFields: { label: string; value: string }[];
	themeSprings: ThemeSprings;
};

export const ProfileInfoRows = ({
	memberSince,
	metadataFields,
	themeSprings
}: ProfileInfoRowsProps) => (
	<animated.div
		style={{
			borderTop: '1px solid',
			borderTopColor: themeSprings.themeTertiary,
			display: 'flex',
			flexDirection: 'column',
			gap: '0.75rem',
			paddingTop: '1.5rem'
		}}
	>
		<ProfileInfoRow
			label="Member since"
			themeSprings={themeSprings}
			value={memberSince}
		/>
		{metadataFields.map((field) => (
			<ProfileInfoRow
				key={field.label}
				label={field.label}
				themeSprings={themeSprings}
				value={field.value}
			/>
		))}
	</animated.div>
);
