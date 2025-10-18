import { animated } from '@react-spring/web';
import { ChangeEvent, useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Prism } from 'react-syntax-highlighter';
import {
	prism,
	nightOwl
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeSprings } from '../../../types/springTypes';
import {
	highlighterContainerStyle,
	highlighterHeaderStyle,
	highlighterSelectContainerStyle,
	highlighterSelectStyle,
	selectArrowStyle
} from '../../styles/syntaxHighlighterStyles';
import { CopyButton } from './CopyButton';

type PrismPlusProps = {
	codeString: string | string[];
	language?: string;
	showLineNumbers?: boolean;
	options?: string[];
	themeSprings: ThemeSprings;
};

export const PrismPlus = ({
	codeString,
	language = 'tsx',
	showLineNumbers = true,
	options,
	themeSprings
}: PrismPlusProps) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
	const [renderKey, setRenderKey] = useState(0);

	// Force re-render when theme changes by incrementing renderKey
	useEffect(() => {
		let currentTheme = themeSprings.theme.get();
		
		const checkTheme = () => {
			const newTheme = themeSprings.theme.get();
			if (newTheme !== currentTheme) {
				currentTheme = newTheme;
				setRenderKey(prev => prev + 1);
			}
		};

		const interval = setInterval(checkTheme, 100);
		return () => clearInterval(interval);
	}, [themeSprings.theme]);

	// Get current theme and appropriate style
	const currentTheme = themeSprings.theme.get();
	const isDark = currentTheme.endsWith('dark');
	const codeStyle = isDark ? nightOwl : prism;

	const codeStringsArray = Array.isArray(codeString)
		? codeString
		: [codeString];
	const optionsArray = options || [];

	const displayedCodeString =
		codeStringsArray[selectedOptionIndex] ?? codeStringsArray[0] ?? '';

	const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOptionIndex(Number(event.target.value));
	};

	const getDisplayLanguage = (lang: string) => {
		const langMap: { [key: string]: string } = {
			javascript: 'JS',
			typescript: 'TS'
		};

		return langMap[lang.toLowerCase()] || lang.toUpperCase();
	};

	return (
		<div style={highlighterContainerStyle}>
			<animated.div style={highlighterHeaderStyle(themeSprings)}>
				<span style={{ color: 'inherit', fontSize: '0.9em' }}>
					{getDisplayLanguage(language)}
				</span>
				{options && options.length > 0 && (
					<div style={highlighterSelectContainerStyle}>
						<select
							style={highlighterSelectStyle}
							value={selectedOptionIndex}
							onChange={handleOptionChange}
						>
							{optionsArray.map((option, index) => (
								<option key={index} value={index}>
									{option}
								</option>
							))}
						</select>
						<FiChevronDown style={selectArrowStyle} />
					</div>
				)}
				<CopyButton text={displayedCodeString} />
			</animated.div>
			{/* @ts-expect-error react 19 thing where we have 18 types */}
			<Prism
				key={`${renderKey}-${selectedOptionIndex}-${currentTheme}`}
				language={language}
				style={codeStyle}
				customStyle={{
					margin: 0,
					marginBottom: '1.5rem',
					padding: '1rem'
				}}
				showLineNumbers={showLineNumbers}
			>
				{displayedCodeString}
			</Prism>
		</div>
	);
};
