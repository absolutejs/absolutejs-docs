type OAuthFlowMarkersProps = {
	accentColor: string;
	accentSecondaryColor: string;
	arrowColor: string;
};

export const OAuthFlowMarkers = ({
	accentColor,
	accentSecondaryColor,
	arrowColor
}: OAuthFlowMarkersProps) => (
	<defs>
		<marker
			fill={arrowColor}
			id="oauth-arrow"
			markerHeight={6}
			markerWidth={6}
			orient="auto"
			refX={5}
			refY={3}
		>
			<polygon points="0 0, 6 3, 0 6" />
		</marker>
		<marker
			fill={accentColor}
			id="oauth-arrow-accent"
			markerHeight={6}
			markerWidth={6}
			orient="auto"
			refX={5}
			refY={3}
		>
			<polygon points="0 0, 6 3, 0 6" />
		</marker>
		<marker
			fill={accentSecondaryColor}
			id="oauth-arrow-success"
			markerHeight={6}
			markerWidth={6}
			orient="auto"
			refX={5}
			refY={3}
		>
			<polygon points="0 0, 6 3, 0 6" />
		</marker>
	</defs>
);
