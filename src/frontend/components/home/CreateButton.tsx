import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { LuCopyCheck } from 'react-icons/lu';
import { COPY_TIMEOUT_DURATION } from '../../../constants';

export const CreateButton = () => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText('bun create absolutejs')
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), COPY_TIMEOUT_DURATION);

				return null;
			})
			.catch((err) => {
				console.error('Copy failed', err);
			});
	};

	return (
		<div
			onClick={handleCopy}
			style={{
				alignItems: 'center',
				backgroundColor: '#f0f0f0',
				border: '1px solid #ccc',
				borderRadius: '16px',
				cursor: 'pointer',
				display: 'flex',
				justifyContent: 'center',
				padding: '10px 20px'
			}}
		>
			<code
				style={{
					color: '#333',
					fontSize: '1.2rem',
					marginRight: '2rem'
				}}
			>
				bun create absolutejs
			</code>
			{copied ? <LuCopyCheck /> : <FiCopy />}
			<p
				style={{
					fontSize: '0.8rem',
					marginLeft: '0.5rem',
					minWidth: '6ch'
				}}
			>
				{copied ? 'Copied' : 'Copy'}
			</p>
		</div>
	);
};
