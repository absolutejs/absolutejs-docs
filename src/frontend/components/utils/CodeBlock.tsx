import { codeToHtml } from 'shiki';
import { transformerTwoslash, rendererRich } from '@shikijs/twoslash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { codeWrapperStyle } from '../../styles/docsStyles';
type CodeBlockProps = {
    code: string;
    theme?: string;
};

export async function CodeBlock({ code, theme }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: 'ts',
        theme: theme ?? 'night-owl',
        transformers: [transformerTwoslash({
            renderer: rendererRich()
        })],
    });
    
    return html;
}

type BashCodeBlockProps = {
    children: string;
};

export const BashCodeBlock = ({
    children
}: BashCodeBlockProps) => {
    return (
        <div>
            {/* @ts-expect-error react 19 compatibility */}
            <SyntaxHighlighter style={nightOwl}
                customStyle={{ borderRadius: '1rem', width: 'fit-content', maxWidth: '100%' }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};