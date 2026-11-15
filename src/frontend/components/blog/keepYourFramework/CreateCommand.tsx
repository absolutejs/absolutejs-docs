import { useState } from 'react';
import { chapterFrameworks, frameworkColor } from './frameworks';

const COPY_FEEDBACK_DURATION_MS = 1600;

// The close: the six file tabs again, each one swapping the create
// command's framework flag.
export const CreateCommand = () => {
	const [active, setActive] = useState(1);
	const [copied, setCopied] = useState(false);
	const framework = chapterFrameworks[active] ?? chapterFrameworks[0];
	if (framework === undefined) return null;

	const command = `bun create absolutejs my-app ${framework.createFlag}`;
	const copy = async () => {
		await navigator.clipboard.writeText(command);
		setCopied(true);
		window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
	};

	return (
		<div className="kyf-create" style={frameworkColor(framework.color)}>
			<fieldset className="kyf-create-tabs">
				<legend>Start with</legend>
				{chapterFrameworks.map((item, index) => (
					<button
						aria-pressed={index === active}
						className="kyf-tab"
						key={item.key}
						onClick={() => setActive(index)}
						style={frameworkColor(item.color)}
						type="button"
					>
						{item.name}
					</button>
				))}
			</fieldset>
			<div className="post-command">
				<code>
					bun create absolutejs{' '}
					<span className="kyf-nowrap">my-app</span>{' '}
					<span className="kyf-nowrap">{framework.createFlag}</span>
				</code>
				<button onClick={copy} type="button">
					{copied ? 'Copied' : 'Copy'}
				</button>
			</div>
		</div>
	);
};
