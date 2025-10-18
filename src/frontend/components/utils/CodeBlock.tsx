import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
    children: string;
    language?: string;
    showLineNumbers?: boolean;
};

export const CodeBlock = ({
    children,
    language = 'typescript',
    showLineNumbers = false
}: CodeBlockProps) => {
    return (
        <div
            style={{
                marginBottom: '1.5rem',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* @ts-expect-error react 19 compatibility */}
            <SyntaxHighlighter
                language={language}
                style={nightOwl}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: 0,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    borderRadius: '8px'
                }}
                codeTagProps={{
                    style: {
                        fontFamily:
                            '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, Monaco, "Courier New", monospace'
                    }
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};