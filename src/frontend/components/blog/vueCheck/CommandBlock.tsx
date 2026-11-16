import { useState } from 'react';

const COPY_FEEDBACK_DURATION_MS = 1600;

type CommandBlockProps = {
	className?: string;
	command: string;
};

// A shell command with a copy button. `className` picks the frame: the
// default is the article's own; the closing band passes `cpr-command`.
export const CommandBlock = ({
	className = 'vc-command',
	command
}: CommandBlockProps) => {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		await navigator.clipboard.writeText(command);
		setCopied(true);
		window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
	};

	return (
		<div className={className}>
			<code>{command}</code>
			<button
				aria-label={copied ? 'Copied' : 'Copy the command'}
				onClick={copy}
				type="button"
			>
				{copied ? 'Copied' : 'Copy'}
			</button>
		</div>
	);
};
