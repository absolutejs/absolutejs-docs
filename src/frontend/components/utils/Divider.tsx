import {
	separatorStyle,
	separatorLineStyle,
	separatorTextStyle
} from '../../styles/authModalStyles';

type DividerProps = {
	color?: string;
	height?: string;
	text?: string;
};

export const Divider = ({ color, text, height }: DividerProps) => (
	<div style={separatorStyle}>
		<div
			style={separatorLineStyle({
				color: color,
				height: height
			})}
		/>
		{typeof text === 'string' && text.trim() !== '' && (
			<span style={separatorTextStyle}>{text}</span>
		)}
		<div
			style={separatorLineStyle({
				color: color,
				height: height
			})}
		/>
	</div>
);
