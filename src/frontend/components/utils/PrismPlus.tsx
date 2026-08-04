import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { CopyButton } from './CopyButton';
import { ShikiHtml } from './ShikiHtml';
import { resolveCodeLanguage } from './codeHighlighter';

type PrismPlusProps = {
	codeString: string | string[];
	filename?: string;
	language?: string;
	showLineNumbers?: boolean;
	options?: string[];
	themeSprings: ThemeSprings;
	wrapLongLines?: boolean;
};

const languageColors: Record<string, string> = {
	css: '#38BDF8',
	docker: '#2496ED',
	html: '#E34F26',
	javascript: '#F7DF1E',
	json: '#F59E0B',
	shellscript: '#10B981',
	sql: '#E38C00',
	svelte: '#FF3E00',
	text: '#64748B',
	toml: '#9C4221',
	tsx: '#61DAFB',
	typescript: '#3178C6',
	vue: '#42B883',
	yaml: '#8B5CF6'
};

const activeTabFontWeight = 700;
const inactiveTabFontWeight = 500;
const inactiveTabOpacity = 0.65;

const languageLabels: Record<string, string> = {
	javascript: 'JS',
	shellscript: 'SH',
	text: 'TXT',
	typescript: 'TS'
};

const panelStyle = (themeSprings: ThemeSprings) => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? '#1A1B26' : '#EFF1F5'
	),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '1px solid rgba(99, 102, 241, 0.18)'
			: '1px solid rgba(99, 102, 241, 0.14)'
	),
	borderRadius: '0.75rem',
	boxShadow: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '0 4px 24px rgba(0, 0, 0, 0.35)'
			: '0 4px 24px rgba(15, 23, 42, 0.06)'
	),
	marginBottom: '1.5rem',
	overflow: 'hidden',
	width: '100%'
});

const headerStyle = (themeSprings: ThemeSprings) => ({
	alignItems: 'center',
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(255, 255, 255, 0.03)'
			: 'rgba(15, 23, 42, 0.03)'
	),
	borderBottom: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '1px solid rgba(255, 255, 255, 0.06)'
			: '1px solid rgba(15, 23, 42, 0.06)'
	),
	display: 'flex',
	gap: '0.75rem',
	padding: '0.5rem 1rem'
});

const languageDotStyle = (color: string): CSSProperties => ({
	background: color,
	borderRadius: '50%',
	flexShrink: 0,
	height: '0.5rem',
	width: '0.5rem'
});

const identityStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flex: 1,
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.72rem',
	fontWeight: 600,
	gap: '0.5rem',
	letterSpacing: '0.05em',
	minWidth: 0,
	opacity: 0.75,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap'
};

const variantTabStyle = (active: boolean): CSSProperties => ({
	background: active ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
	border: active
		? '1px solid rgba(99, 102, 241, 0.45)'
		: '1px solid transparent',
	borderRadius: '0.4rem',
	color: 'inherit',
	cursor: 'pointer',
	fontSize: '0.72rem',
	fontWeight: active ? activeTabFontWeight : inactiveTabFontWeight,
	opacity: active ? 1 : inactiveTabOpacity,
	padding: '0.25rem 0.6rem'
});

export const PrismPlus = ({
	codeString,
	filename,
	language = 'tsx',
	showLineNumbers = true,
	options,
	themeSprings,
	wrapLongLines = true
}: PrismPlusProps) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

	const codeStringsArray = Array.isArray(codeString)
		? codeString
		: [codeString];
	const displayedCodeString =
		codeStringsArray[selectedOptionIndex] ?? codeStringsArray[0] ?? '';

	const resolvedLanguage = resolveCodeLanguage(language);
	const languageColor = languageColors[resolvedLanguage] ?? '#64748B';
	const languageLabel =
		languageLabels[resolvedLanguage] ?? resolvedLanguage.toUpperCase();

	return (
		<animated.div
			className="code-panel"
			data-code-mode={themeSprings.theme.to((theme) =>
				theme.endsWith('dark') ? 'dark' : 'light'
			)}
			data-line-numbers={showLineNumbers ? 'true' : 'false'}
			data-wrap={wrapLongLines ? 'true' : 'false'}
			style={panelStyle(themeSprings)}
		>
			<animated.div style={headerStyle(themeSprings)}>
				<span style={identityStyle}>
					<span style={languageDotStyle(languageColor)} />
					{filename ?? languageLabel}
				</span>
				{options && options.length > 0 ? (
					<span
						role="tablist"
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.3rem'
						}}
					>
						{options.map((option, index) => (
							<button
								aria-selected={index === selectedOptionIndex}
								key={option}
								onClick={() => setSelectedOptionIndex(index)}
								role="tab"
								style={variantTabStyle(
									index === selectedOptionIndex
								)}
								type="button"
							>
								{option}
							</button>
						))}
					</span>
				) : null}
				<CopyButton text={displayedCodeString} />
			</animated.div>
			<ShikiHtml code={displayedCodeString} language={language} />
		</animated.div>
	);
};
