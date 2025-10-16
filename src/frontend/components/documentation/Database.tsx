import { DocLayout } from '../documentation/DocLayout';
import { PrismPlus } from '../utils/PrismPlus';
import { useTheme } from '../../hooks/useTheme';
import type { ThemeProps } from '../../../types/types';
export const Database = ({ themeSprings }: ThemeProps) => {
    const [fallbackTs] = useTheme(undefined);
    const ts = themeSprings ?? fallbackTs;
    return (
        <DocLayout title="Database" themeSprings={ts}>
            <p>
                The Auth module handles authentication and provider configuration through
                <code>absoluteAuthConfig</code> and <code>providersConfiguration</code>.
            </p>
            <h2>Quick Example</h2>
            <PrismPlus
                themeSprings={ts}
                language="ts"
                codeString={`import { absoluteAuthConfig } from '@absolutejs/auth';
                const auth = absoluteAuthConfig({
                google: { clientId: '...', clientSecret: '...' },
                github: { clientId: '...', clientSecret: '...' }
                });`}
            />
            <h2>How It Works</h2>
            <p>
            Explain the logic, patterns, or key API calls. Keep it concise and focus
            on what users need to know to implement it.
            </p>
        </DocLayout>
    );
};

export default Database;