import { transformerTwoslash, rendererRich } from '@shikijs/twoslash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createHighlighter } from 'shiki';

type CodeBlockProps = {
    code: string;
    theme?: string;
};

const highlighterPromise = createHighlighter({ langs: ['typescript'], themes: ['night-owl'] })

export async function CodeBlock({ code, theme }: CodeBlockProps) {
    const highlighter = await highlighterPromise;
    const html = highlighter.codeToHtml(code, {
        // transformers: [transformerTwoslash({ renderer: rendererRich() })], // Disabled for development performance
        lang: 'ts',
        theme: theme ?? 'night-owl',
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