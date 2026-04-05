import { CENTER_HUB_LOGO_LAYOUT } from '../../../constants';

type CenterHubLogoProps = {
	centerX: number;
	centerY: number;
};

export const CenterHubLogo = ({ centerX, centerY }: CenterHubLogoProps) => (
	<foreignObject
		height={70}
		width={70}
		x={centerX - CENTER_HUB_LOGO_LAYOUT.offset}
		y={centerY - CENTER_HUB_LOGO_LAYOUT.offset}
	>
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				height: '100%',
				justifyContent: 'center',
				width: '100%'
			}}
		>
			<img
				alt="AbsoluteJS"
				height={60}
				src="/assets/favicon.ico"
				width={60}
			/>
		</div>
	</foreignObject>
);
