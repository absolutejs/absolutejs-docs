// Words people search for that a page may never use itself. Matched by page
// id prefix, so every page in a section shares its section's terms.
const keywordsByViewPrefix: Array<[string, string[]]> = [
	[
		'native-',
		[
			'android',
			'app',
			'app store',
			'capacitor',
			'emulator',
			'expo',
			'google play',
			'ios',
			'iphone',
			'mobile',
			'native',
			'phone',
			'react native',
			'simulator',
			'tablet',
			'testflight'
		]
	],
	['devices', ['camera', 'mobile', 'native', 'permissions']],
	['auth-expo', ['expo', 'mobile', 'native', 'react native']],
	['sync-expo', ['expo', 'mobile', 'native', 'offline']],
	['sync-capacitor', ['capacitor', 'mobile', 'native', 'offline']],
	['pwa', ['installable', 'offline', 'push', 'service worker', 'web push']],
	['absolute-auth', ['login', 'oauth', 'oidc', 'session', 'sign in', 'sso']],
	['auth-', ['login', 'oauth', 'session', 'sign in']],
	['sync-', ['offline', 'realtime', 'websocket']],
	['rag', ['embeddings', 'retrieval', 'vector']],
	['voice', ['speech', 'stt', 'telephony', 'tts']],
	['deployment', ['deploy', 'hosting', 'production']],
	['bvm', ['bun version', 'nvm', 'version manager']]
];

export const searchKeywordsFor = (view: string) =>
	keywordsByViewPrefix.flatMap(([prefix, keywords]) =>
		view === prefix || view.startsWith(prefix) ? keywords : []
	);
