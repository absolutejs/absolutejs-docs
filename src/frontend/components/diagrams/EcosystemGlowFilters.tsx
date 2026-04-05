type EcosystemGlowFiltersProps = {
	accentColor: string;
	accentSecondaryColor: string;
};

export const EcosystemGlowFilters = ({
	accentColor,
	accentSecondaryColor
}: EcosystemGlowFiltersProps) => (
	<defs>
		<linearGradient id="eco-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
			<stop offset="0%" stopColor={accentColor} />
			<stop offset="100%" stopColor={accentSecondaryColor} />
		</linearGradient>
		<filter id="glow">
			<feGaussianBlur result="coloredBlur" stdDeviation="4" />
			<feMerge>
				<feMergeNode in="coloredBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="hover-glow">
			<feGaussianBlur result="coloredBlur" stdDeviation="8" />
			<feMerge>
				<feMergeNode in="coloredBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
);
