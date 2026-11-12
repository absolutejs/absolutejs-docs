import { ShikiHtml } from '../../utils/ShikiHtml';

type CodeSampleProps = {
	code: string;
	file: string;
	language: string;
};

export const CodeSample = ({ code, file, language }: CodeSampleProps) => (
	<div className="cpr-code">
		<div className="cpr-code-bar">
			<span>{file}</span>
			<span>{language}</span>
		</div>
		<ShikiHtml code={code} language={language} />
	</div>
);
