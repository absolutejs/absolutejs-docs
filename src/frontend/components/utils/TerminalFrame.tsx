import { CSSProperties } from 'react';
import { CopyButton } from './CopyButton';

type TerminalFrameProps = {
	command?: string;
	output: string;
	title?: string;
};

const frameStyle: CSSProperties = {
	background: 'linear-gradient(180deg, #10121C 0%, #0B0D14 100%)',
	border: '1px solid rgba(99, 102, 241, 0.25)',
	borderRadius: '0.75rem',
	margin: '1rem 0 1.5rem',
	overflow: 'hidden'
};

const headerStyle: CSSProperties = {
	alignItems: 'center',
	background: 'rgba(99, 102, 241, 0.08)',
	borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
	display: 'flex',
	gap: '0.75rem',
	padding: '0.5rem 0.9rem'
};

const dotStyle = (color: string): CSSProperties => ({
	background: color,
	borderRadius: '50%',
	height: '0.6rem',
	opacity: 0.75,
	width: '0.6rem'
});

const bodyStyle: CSSProperties = {
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	lineHeight: 1.7,
	margin: 0,
	overflowX: 'auto',
	padding: '1rem 1.1rem'
};

export const TerminalFrame = ({
	command,
	output,
	title
}: TerminalFrameProps) => (
	<div style={frameStyle}>
		<div style={headerStyle}>
			<span style={{ display: 'flex', gap: '0.4rem' }}>
				<span style={dotStyle('#EF4444')} />
				<span style={dotStyle('#F59E0B')} />
				<span style={dotStyle('#10B981')} />
			</span>
			<span
				style={{
					color: 'rgba(228, 228, 231, 0.6)',
					flex: 1,
					fontFamily: 'JetBrains Mono, monospace',
					fontSize: '0.72rem',
					letterSpacing: '0.04em'
				}}
			>
				{title ?? command ?? 'terminal'}
			</span>
			{command ? <CopyButton text={command} /> : null}
		</div>
		<pre style={bodyStyle}>
			{command ? (
				<div style={{ marginBottom: output ? '0.35rem' : 0 }}>
					<span style={{ color: '#818CF8', fontWeight: 700 }}>
						${' '}
					</span>
					<span style={{ color: '#E4E4E7', fontWeight: 600 }}>
						{command}
					</span>
				</div>
			) : null}
			<div style={{ color: 'rgba(212, 212, 216, 0.85)' }}>{output}</div>
		</pre>
	</div>
);
