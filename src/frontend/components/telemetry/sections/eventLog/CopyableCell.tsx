import { HALF } from '../../../../../constants';
import { FiCopy } from 'react-icons/fi';
import { LuCopyCheck } from 'react-icons/lu';
import { primaryColor } from '../../../../styles/colors';
import { cellCopyButtonStyle, cellWithCopyStyle } from './eventLogStyles';

type CopyableCellProps = {
	text: string;
	copyKey: string;
	isCopied: boolean;
	label: string;
	onCopy: (key: string, text: string) => void;
};

export const CopyableCell = ({
	text,
	copyKey,
	isCopied,
	label,
	onCopy
}: CopyableCellProps) => (
	<div style={cellWithCopyStyle}>
		<span
			style={{
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap'
			}}
		>
			{text}
		</span>
		<button
			onClick={(event) => {
				event.stopPropagation();
				onCopy(copyKey, text);
			}}
			style={{
				...cellCopyButtonStyle,
				opacity: isCopied ? 1 : HALF
			}}
			title={`Copy ${label}`}
		>
			{isCopied ? <LuCopyCheck color={primaryColor} /> : <FiCopy />}
		</button>
	</div>
);
