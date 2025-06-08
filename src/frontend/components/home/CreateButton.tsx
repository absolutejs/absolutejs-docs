import { CopyButton } from '../utils/CopyButton';

export const CreateButton = () => (
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
				marginRight: '2rem'
			}}
		>
			bun create absolutejs
		</code>
		<CopyButton text="bun create absolutejs" />
	</div>
);
