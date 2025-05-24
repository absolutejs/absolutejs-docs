import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { LuCopyCheck } from 'react-icons/lu';

export const CreateButton = () => {
	const [copied, setCopied] = useState(false);

	const TIMEOUT_DURATION = 2000;
	// eslint-disable-next-line absolute/localize-react-props
	const handleCopy = () => {
		navigator.clipboard.writeText('bun create absolutejs');
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, TIMEOUT_DURATION);
	};

	return (
		<div
			style={{
				alignItems: 'center',
				backgroundColor: '#f0f0f0',
				border: '1px solid #ccc',
				borderRadius: '16px',
				display: 'flex',
				justifyContent: 'center',
				padding: '10px 20px'
			}}
		>
			<code
				style={{
					color: '#333',
					fontSize: '1.2rem',
					marginRight: '10px'
				}}
			>
				bun create absolutejs
			</code>
			{copied ? (
				<LuCopyCheck />
			) : (
				<FiCopy
					style={{
						cursor: 'pointer'
					}}
					onClick={handleCopy}
				/>
			)}
		</div>
	);
};
