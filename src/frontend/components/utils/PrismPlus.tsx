import { ChangeEvent, CSSProperties, useState } from 'react';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AiOutlineCheck, AiOutlineCopy } from 'react-icons/ai';
import {
	highlighterContainerStyle,
	highlighterHeaderStyle,
	highlighterCopyButtonStyle,
	highlighterSelectContainerStyle,
	highlighterSelectStyle,
	selectArrowStyle
} from '../../styles/syntaxHighlighterStyles';
import { FiChevronDown } from 'react-icons/fi';

type PrismPlusProps = {
	codeString: string | string[];
	language?: string;
	showLineNumbers?: boolean;
	codeStyle?: SyntaxHighlighterProps['style'];
	options?: string[];
};

export const PrismPlus = ({
	codeString,
	language = 'tsx',
	showLineNumbers = true,
	codeStyle = nightOwl,
	options
}: PrismPlusProps) => {
	const [copied, setCopied] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

	const codeStringsArray = Array.isArray(codeString)
		? codeString
		: [codeString];
	const optionsArray = options || [];

	const displayedCodeString =
		codeStringsArray[selectedOptionIndex] ?? codeStringsArray[0] ?? '';

	const handleCopy = () => {
		if (!displayedCodeString) {
			console.warn('Nothing to copy');
			return;
		}

		navigator.clipboard
			.writeText(displayedCodeString)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2500);
			})
			.catch((err) => {
				console.error('Copy failed', err);
			});
	};

	const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOptionIndex(Number(event.target.value));
	};

	const getDisplayLanguage = (lang: string) => {
		const langMap: { [key: string]: string } = {
			typescript: 'TS',
			javascript: 'JS'
		};
		return langMap[lang.toLowerCase()] || lang.toUpperCase();
	};

	return (
		<div style={highlighterContainerStyle}>
			<div style={highlighterHeaderStyle}>
				<span style={{ fontSize: '0.9em', color: '#333' }}>
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
				<button onClick={handleCopy} style={highlighterCopyButtonStyle}>
					{copied ? (
						<>
							<AiOutlineCheck />
							Copied!
						</>
					) : (
						<>
							<AiOutlineCopy />
							Copy Code
						</>
					)}
				</button>
			</div>
			<Prism
				language={language}
				style={codeStyle}
				showLineNumbers={showLineNumbers}
			>
				{displayedCodeString}
			</Prism>
		</div>
	);
};
