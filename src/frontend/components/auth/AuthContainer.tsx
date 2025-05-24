import { useState } from 'react';
import {
	containerStyle,
	headingStyle,
	loginTextStyle,
	loginLinkTextStyle
} from '../../styles/authModalStyles';
import { OAuthLinks } from './OAuthLinks';

export const AuthContainer = () => {
	const [mode, setMode] = useState<'login' | 'signup'>('login');
	const switchMode = () => {
		setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
	};

	return (
		<div style={containerStyle}>
			<a
				href="/"
				style={{
					color: 'black',
					fontSize: '1.5rem',
					fontWeight: 'bold',
					textDecoration: 'none'
				}}
			>
				AbsoluteJS
			</a>
			<h1 style={headingStyle}>
				{mode === 'login'
					? 'Sign in to your Account'
					: 'Create an account'}
			</h1>

			<OAuthLinks mode={mode} />

			<p style={loginTextStyle}>
				{mode === 'login' ? 'Need an account? ' : 'Have an account? '}
				<button style={loginLinkTextStyle} onClick={switchMode}>
					{mode === 'login' ? 'Sign Up' : 'Sign In'}
				</button>
			</p>
		</div>
	);
};
