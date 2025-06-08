import { ChangeEvent, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
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
	codeStyle: SyntaxHighlighterProps['style'];
	options?: string[];
};

export const PrismPlus = ({
	codeString,
	language = 'tsx',
	showLineNumbers = true,
	codeStyle,
	options
}: PrismPlusProps) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

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
			<div style={highlighterHeaderStyle}>
				<span style={{ color: '#333', fontSize: '0.9em' }}>
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
			</div>
			{/* @ts-expect-error react 19 thing where we have 18 types */}
			<Prism
				language={language}
				style={codeStyle}
				customStyle={{ margin: 0, padding: '1rem' }}
				showLineNumbers={showLineNumbers}
			>
				{displayedCodeString}
			</Prism>
		</div>
	);
};
