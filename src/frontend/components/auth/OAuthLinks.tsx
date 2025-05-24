import { Divider } from '../utils/Divider';
import { OAuthLink } from './OAuthLink';

type OAuthLinksProps = {
	mode: 'login' | 'signup';
};

export const OAuthLinks = ({ mode }: OAuthLinksProps) => (
	<nav
		style={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%'
		}}
	>
		<OAuthLink mode={mode} provider="google" />

		<Divider text="or" />

		<OAuthLink mode={mode} provider="github" />
	</nav>
);
