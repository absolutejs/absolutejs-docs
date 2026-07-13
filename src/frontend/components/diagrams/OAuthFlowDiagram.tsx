import { ThemeSprings } from '../../../types/springTypes';
import { Callout } from '../utils/Callout';
import { StepFlow, StepFlowStep } from '../utils/StepFlow';

type OAuthFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

const steps: StepFlowStep[] = [
	{
		actor: 'User',
		description: 'The user clicks a login button in your app.',
		title: 'Login click'
	},
	{
		actor: 'Your App',
		code: '/oauth2/auth/:provider',
		description:
			'Your app redirects the browser to the AbsoluteAuth route.',
		title: 'Redirect to the auth route'
	},
	{
		actor: 'AbsoluteAuth',
		description:
			'AbsoluteAuth generates the state and PKCE values for the request.',
		title: 'Generate state + PKCE'
	},
	{
		actor: 'AbsoluteAuth',
		description:
			'The browser is redirected to the provider authorization page.',
		title: 'Redirect to provider'
	},
	{
		actor: 'Provider',
		description:
			'The user authenticates directly with the provider (external).',
		title: 'User login'
	},
	{
		actor: 'Provider',
		description:
			'The provider redirects back to AbsoluteAuth with an authorization code.',
		title: 'Callback + code'
	},
	{
		actor: 'AbsoluteAuth',
		description:
			'AbsoluteAuth exchanges the code with the provider for an access token.',
		title: 'Exchange code for token'
	},
	{
		actor: 'AbsoluteAuth',
		description:
			'A session is created and the user is redirected back to your app.',
		title: 'Session created'
	}
];

export const OAuthFlowDiagram = ({ themeSprings }: OAuthFlowDiagramProps) => (
	<div>
		<StepFlow steps={steps} themeSprings={themeSprings} />
		<Callout themeSprings={themeSprings} variant="success">
			AbsoluteAuth handles steps 2-8 automatically.
		</Callout>
	</div>
);
