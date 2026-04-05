import { TELEMETRY_CONFIRM_INPUT_LAYOUT } from '../../../../../constants';
import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { LuCopyCheck } from 'react-icons/lu';
import { primaryColor } from '../../../../styles/colors';
import {
	confirmHintTextStyle,
	confirmHintWrapperStyle,
	confirmInputStyle,
	confirmLabelStyle,
	copyButtonStyle
} from './eventLogStyles';

type ConfirmTypeInputProps = {
	expectedText: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
};

export const ConfirmTypeInput = ({
	expectedText,
	value,
	onChange,
	placeholder
}: ConfirmTypeInputProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		const copyText = async () => {
			try {
				await navigator.clipboard.writeText(expectedText);
				setCopied(true);
				setTimeout(
					() => setCopied(false),
					TELEMETRY_CONFIRM_INPUT_LAYOUT.copyFeedbackDurationMs
				);
			} catch {
				// Clipboard access can fail outside secure contexts.
			}
		};

		void copyText();
	};

	return (
		<div style={{ marginBottom: '1.25rem' }}>
			<div style={confirmLabelStyle}>
				Type{' '}
				<span style={confirmHintWrapperStyle}>
					<span style={confirmHintTextStyle}>{expectedText}</span>
					<button
						onClick={handleCopy}
						style={copyButtonStyle}
						title="Copy to clipboard"
					>
						{copied ? (
							<LuCopyCheck color={primaryColor} />
						) : (
							<FiCopy />
						)}
					</button>
				</span>{' '}
				to confirm
			</div>
			<input
				autoFocus
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				style={confirmInputStyle}
				type="text"
				value={value}
			/>
		</div>
	);
};
