import { codeToHtml } from 'shiki';
import { transformerTwoslash, rendererRich } from '@shikijs/twoslash';

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