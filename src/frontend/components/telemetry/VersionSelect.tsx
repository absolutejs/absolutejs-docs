import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type VersionSelectProps = {
	versions: string[];
	value: string;
	onChange: (version: string) => void;
	themeSprings: ThemeSprings;
	allLabel?: string;
};

const selectStyle = (themeSprings: ThemeSprings) => ({
	backgroundColor: themeSprings.themeSecondary,
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: themeSprings.contrastPrimary,
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	minWidth: '8rem',
	padding: '0.3rem 0.6rem'
});

const optionStyle = (themeSprings: ThemeSprings) => ({
	backgroundColor: themeSprings.themeSecondary,
	color: themeSprings.contrastPrimary
});

export const VersionSelect = ({
	versions,
	value,
	onChange,
	themeSprings,
	allLabel = 'All versions'
}: VersionSelectProps) => (
	<animated.select
		onChange={(evt) => onChange(evt.target.value)}
		style={selectStyle(themeSprings)}
		value={value}
	>
		<animated.option style={optionStyle(themeSprings)} value="">
			{allLabel}
		</animated.option>
		{versions.map((ver) => (
			<animated.option
				key={ver}
				style={optionStyle(themeSprings)}
				value={ver}
			>
				{ver}
			</animated.option>
		))}
	</animated.select>
);
