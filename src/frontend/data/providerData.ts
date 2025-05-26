import { ProviderOption } from 'citra';

export type ProviderInfo = {
	name: string;
	logoUrl: string;
	primaryColor: string;
	manageCredentialsUrl: string;
	createNewCredentialsUrl: string;
};

type ProviderData = Record<Lowercase<ProviderOption>, ProviderInfo>;

export const providerData: ProviderData = {
	'42': {
		logoUrl: '/assets/svg/42-logo.svg',
		name: '42',
		primaryColor: '#000000',
		manageCredentialsUrl: 'https://profile.intra.42.fr/oauth/applications',
		createNewCredentialsUrl:
			'https://profile.intra.42.fr/oauth/applications/new'
	},
	amazoncognito: {
		logoUrl: '/assets/svg/amazoncognito-logo.svg',
		name: 'Amazon Cognito',
		primaryColor: '#DD344C',
		manageCredentialsUrl:
			'https://console.aws.amazon.com/cognito/home#/user-pools',
		createNewCredentialsUrl:
			'https://console.aws.amazon.com/cognito/home#/user-pools'
	},

	anilist: {
		logoUrl: '/assets/svg/anilist-logo.svg',
		name: 'AniList',
		primaryColor: '#02A9FF',
		manageCredentialsUrl: 'https://anilist.co/settings/developer',
		createNewCredentialsUrl: 'https://anilist.co/settings/developer'
	},
	apple: {
		logoUrl: '/assets/svg/apple-logo.svg',
		name: 'Apple',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://developer.apple.com/account/resources/identifiers/list',
		createNewCredentialsUrl:
			'https://developer.apple.com/account/resources/identifiers/add'
	},
	atlassian: {
		logoUrl: '/assets/svg/atlassian-logo.svg',
		name: 'Atlassian',
		primaryColor: '#0052CC',
		manageCredentialsUrl: 'https://developer.atlassian.com/console/myapps/',
		createNewCredentialsUrl:
			'https://developer.atlassian.com/console/myapps/'
	},
	auth0: {
		logoUrl: '/assets/svg/auth0-logo.svg',
		name: 'Auth0',
		primaryColor: '#EB5424',
		manageCredentialsUrl: 'https://manage.auth0.com/#/applications',
		createNewCredentialsUrl: 'https://manage.auth0.com/#/applications'
	},
	authentik: {
		logoUrl: '/assets/svg/authentik-logo.svg',
		name: 'Authentik',
		primaryColor: '#FD4B2D',
		manageCredentialsUrl:
			'https://goauthentik.io/docs/add-secure-apps/providers/oauth2/',
		createNewCredentialsUrl:
			'https://goauthentik.io/docs/add-secure-apps/providers/oauth2/create-oauth2-provider'
	},
	autodesk: {
		logoUrl: '/assets/svg/autodesk-logo.svg',
		name: 'Autodesk',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://aps.autodesk.com/hubs/@personal/applications/',
		createNewCredentialsUrl:
			'https://aps.autodesk.com/hubs/@personal/applications/'
	},
	battlenet: {
		logoUrl: '/assets/svg/battlenet-logo.svg',
		name: 'Battle.net',
		primaryColor: '#4381C3',
		manageCredentialsUrl: 'https://develop.battle.net/access/clients',
		createNewCredentialsUrl: 'https://develop.battle.net/access/clients'
	},
	bitbucket: {
		logoUrl: '/assets/svg/bitbucket-logo.svg',
		name: 'Bitbucket',
		primaryColor: '#0052CC',
		manageCredentialsUrl: 'https://bitbucket.org',
		createNewCredentialsUrl:
			'https://support.atlassian.com/bitbucket-cloud/docs/integrate-another-application-through-oauth'
	},
	box: {
		logoUrl: '/assets/svg/box-logo.svg',
		name: 'Box',
		primaryColor: '#0061D5',
		manageCredentialsUrl: 'https://app.box.com/developers/console',
		createNewCredentialsUrl: 'https://app.box.com/developers/console'
	},
	bungie: {
		logoUrl: '/assets/svg/bungie-logo.svg',
		name: 'Bungie',
		primaryColor: '#0075BB',
		manageCredentialsUrl: 'https://www.bungie.net/en/Application',
		createNewCredentialsUrl: 'https://www.bungie.net/en/Application'
	},
	coinbase: {
		logoUrl: '/assets/svg/coinbase-logo.svg',
		name: 'Coinbase',
		primaryColor: '#0052FF',
		manageCredentialsUrl: 'https://www.coinbase.com/settings/api',
		createNewCredentialsUrl: 'https://www.coinbase.com/settings/api'
	},
	discord: {
		logoUrl: '/assets/svg/discord-logo.svg',
		name: 'Discord',
		primaryColor: '#5865F2',
		manageCredentialsUrl: 'https://discord.com/developers/applications',
		createNewCredentialsUrl: 'https://discord.com/developers/applications'
	},
	donationalerts: {
		logoUrl: '/assets/svg/DA_Alert_Color-Logo.svg',
		name: 'Donation Alerts',
		primaryColor: '#F57D07',
		manageCredentialsUrl:
			'https://www.donationalerts.com/application/clients',
		createNewCredentialsUrl:
			'https://www.donationalerts.com/application/clients'
	},
	dribbble: {
		logoUrl: '/assets/svg/dribbble-logo.svg',
		name: 'Dribbble',
		primaryColor: '#EA4C89',
		manageCredentialsUrl: 'https://dribbble.com/account/applications',
		createNewCredentialsUrl: 'https://dribbble.com/account/applications'
	},
	dropbox: {
		logoUrl: '/assets/svg/dropbox-logo.svg',
		name: 'Dropbox',
		primaryColor: '#0061FF',
		manageCredentialsUrl: 'https://www.dropbox.com/developers/apps',
		createNewCredentialsUrl: 'https://www.dropbox.com/developers/apps'
	},
	epicgames: {
		logoUrl: '/assets/svg/epicgames-logo.svg',
		name: 'Epic Games',
		primaryColor: '#313131',
		manageCredentialsUrl: 'https://dev.epicgames.com/portal',
		createNewCredentialsUrl: 'https://dev.epicgames.com/portal'
	},
	etsy: {
		logoUrl: '/assets/svg/etsy-logo.svg',
		name: 'Etsy',
		primaryColor: '#F16521',
		manageCredentialsUrl: 'https://www.etsy.com/developers/your-apps',
		createNewCredentialsUrl: 'https://www.etsy.com/developers/register'
	},
	facebook: {
		logoUrl: '/assets/png/Facebook_Logo_Primary.png',
		name: 'Facebook',
		primaryColor: '#0866FF',
		manageCredentialsUrl: 'https://developers.facebook.com/apps/',
		createNewCredentialsUrl: 'https://developers.facebook.com/apps/'
	},
	figma: {
		logoUrl: '/assets/svg/Figma-Icon-(Full-color).svg',
		name: 'Figma',
		primaryColor: '#F24E1E',
		manageCredentialsUrl: 'https://www.figma.com/developers/apps',
		createNewCredentialsUrl: 'https://www.figma.com/developers/apps'
	},
	gitea: {
		logoUrl: '/assets/svg/gitea-logo.svg',
		name: 'Gitea',
		primaryColor: '#609926',
		manageCredentialsUrl: 'https://gitea.com/user/settings/applications',
		createNewCredentialsUrl: 'https://gitea.com/user/settings/applications'
	},
	github: {
		logoUrl: '/assets/svg/GitHub_Invertocat_Dark.svg',
		name: 'GitHub',
		primaryColor: '#181717',
		manageCredentialsUrl: 'https://github.com/settings/developers',
		createNewCredentialsUrl: 'https://github.com/settings/developers'
	},
	gitlab: {
		logoUrl: '/assets/svg/gitlab-logo.svg',
		name: 'GitLab',
		primaryColor: '#FC6D26',
		manageCredentialsUrl: 'https://gitlab.com/oauth/applications',
		createNewCredentialsUrl: 'https://gitlab.com/oauth/applications'
	},
	google: {
		logoUrl: '/assets/svg/google-logo.svg',
		name: 'Google',
		primaryColor: '#4285F4',
		manageCredentialsUrl:
			'https://console.cloud.google.com/apis/credentials',
		createNewCredentialsUrl:
			'https://console.cloud.google.com/apis/credentials'
	},
	intuit: {
		logoUrl: '/assets/svg/intuit-logo.svg',
		name: 'Intuit',
		primaryColor: '#236CFF',
		manageCredentialsUrl: 'https://developer.intuit.com/workspaces',
		createNewCredentialsUrl: 'https://developer.intuit.com/workspaces'
	},
	kakao: {
		logoUrl: '/assets/svg/kakao-logo.svg',
		name: 'Kakao',
		primaryColor: '#FFCD00',
		manageCredentialsUrl: 'https://developers.kakao.com/apps',
		createNewCredentialsUrl: 'https://developers.kakao.com/apps'
	},
	keycloak: {
		logoUrl: '/assets/svg/keycloak-logo.svg',
		name: 'Keycloak',
		primaryColor: '#4D4D4D',
		manageCredentialsUrl: 'https://lichess.org/api#section/Authentication',
		createNewCredentialsUrl:
			'https://lichess.org/account/oauth/token/create'
	},
	kick: {
		logoUrl: '/assets/svg/kick-logo.svg',
		name: 'Kick',
		primaryColor: '#53FC19',
		manageCredentialsUrl: 'https://kick.com/settings/developer',
		createNewCredentialsUrl: 'https://kick.com/settings/developer'
	},
	lichess: {
		logoUrl: '/assets/svg/lichess-logo.svg',
		name: 'Lichess',
		primaryColor: '#000000',
		manageCredentialsUrl: 'https://lichess.org/api#section/Authentication',
		createNewCredentialsUrl:
			'https://lichess.org/api#section/Authentication'
	},
	line: {
		logoUrl: '/assets/png/LINE_Brand_icon.png',
		name: 'LINE',
		primaryColor: '#00B900',
		manageCredentialsUrl: 'https://developers.line.biz/console',
		createNewCredentialsUrl: 'https://developers.line.biz/console'
	},
	linear: {
		logoUrl: '/assets/svg/linear-logo.svg',
		name: 'Linear',
		primaryColor: '#5E6AD2',
		manageCredentialsUrl: 'https://linear.app/absolutejs/settings/api',
		createNewCredentialsUrl: 'https://linear.app/absolutejs/settings/api'
	},
	linkedin: {
		logoUrl: '/assets/png/LI-In-Bug.png',
		name: 'LinkedIn',
		primaryColor: '#0077B5',
		manageCredentialsUrl: 'https://www.linkedin.com/developers/apps',
		createNewCredentialsUrl: 'https://www.linkedin.com/developers/apps'
	},
	mastodon: {
		logoUrl: '/assets/svg/mastadon-logo-purple.svg',
		name: 'Mastodon',
		primaryColor: '#6364FF',
		manageCredentialsUrl: 'https://mastodon.social/settings/applications',
		createNewCredentialsUrl: 'https://mastodon.social/settings/applications'
	},
	mercadolibre: {
		logoUrl: '/assets/jpeg/mercadolibre-logo.jpeg',
		name: 'Mercado Libre',
		primaryColor: '#FFD100',
		manageCredentialsUrl:
			'https://developers.mercadolibre.com.ar/en_us/manage-your-applications',
		createNewCredentialsUrl:
			'https://developers.mercadolibre.com.ar/en_us/register-your-application'
	},
	mercadopago: {
		logoUrl: '/assets/svg/mercadopago-logo.svg',
		name: 'Mercado Pago',
		primaryColor: '#00B1EA',
		manageCredentialsUrl: 'https://www.mercadopago.com.ar/developers/panel',
		createNewCredentialsUrl:
			'https://www.mercadopago.com.ar/developers/panel'
	},
	microsoftentraid: {
		logoUrl: '/assets/svg/Microsoft-Entra-ID-color-icon.svg',
		name: 'Microsoft Entra ID',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps',
		createNewCredentialsUrl:
			'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp'
	},
	myanimelist: {
		logoUrl: '/assets/svg/myanimelist-logo.svg',
		name: 'MyAnimeList',
		primaryColor: '#2E51A2',
		manageCredentialsUrl: 'https://myanimelist.net/apiconfig',
		createNewCredentialsUrl: 'https://myanimelist.net/apiconfig/create'
	},
	naver: {
		logoUrl: '/assets/png/naver-btnG_icon_circle.png',
		name: 'Naver',
		primaryColor: '#03C75A',
		manageCredentialsUrl: 'https://developers.naver.com/apps/#/list',
		createNewCredentialsUrl: 'https://developers.naver.com/apps/#/list'
	},
	notion: {
		logoUrl: '/assets/svg/notion-logo.svg',
		name: 'Notion',
		primaryColor: '#000000',
		manageCredentialsUrl: 'https://www.notion.so/my-integrations',
		createNewCredentialsUrl: 'https://www.notion.so/my-integrations'
	},
	okta: {
		logoUrl: '/assets/png/Okta_Wordmark_Black_S.png',
		name: 'Okta',
		primaryColor: '#007DC1',
		manageCredentialsUrl: 'https://developer.okta.com/login/',
		createNewCredentialsUrl: 'https://developer.okta.com/login/'
	},
	osu: {
		logoUrl: '/assets/svg/osu-logo.svg',
		name: 'osu!',
		primaryColor: '#FF66AA',
		manageCredentialsUrl: 'https://osu.ppy.sh/home/account/edit#oauth',
		createNewCredentialsUrl:
			'https://osu.ppy.sh/home/account/edit#new-oauth-application'
	},
	patreon: {
		logoUrl: '/assets/svg/PATREON_SYMBOL_1_BLACK_RGB.svg',
		name: 'Patreon',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://www.patreon.com/portal/registration/register-clients',
		createNewCredentialsUrl:
			'https://www.patreon.com/portal/registration/register-clients'
	},
	polar: {
		logoUrl: '/assets/svg/polar-logo.svg',
		name: 'Polar',
		primaryColor: '#000000',
		manageCredentialsUrl: 'https://polar.sh/dashboard',
		createNewCredentialsUrl: 'https://polar.sh/dashboard'
	},
	polaraccesslink: {
		logoUrl: '/assets/png/Polar_logo_black_web.png',
		name: 'Polar Access Link',
		primaryColor: '#DF0827',
		manageCredentialsUrl: 'https://admin.polaraccesslink.com',
		createNewCredentialsUrl: 'https://admin.polaraccesslink.com'
	},
	polarteampro: {
		logoUrl: '/assets/png/Polar_logo_black_web.png',
		name: 'Polar Team Pro',
		primaryColor: '#DF0827',
		manageCredentialsUrl: 'https://admin.polaraccesslink.com',
		createNewCredentialsUrl: 'https://admin.polaraccesslink.com'
	},
	reddit: {
		logoUrl: '/assets/svg/Reddit_Icon_FullColor.svg',
		name: 'Reddit',
		primaryColor: '#FF4500',
		manageCredentialsUrl: 'https://www.reddit.com/prefs/apps',
		createNewCredentialsUrl: 'https://www.reddit.com/prefs/apps'
	},
	roblox: {
		logoUrl: '/assets/svg/roblox-logo.svg',
		name: 'Roblox',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab',
		createNewCredentialsUrl:
			'https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab'
	},
	salesforce: {
		logoUrl: '/assets/svg/salesforce-logo.svg',
		name: 'Salesforce',
		primaryColor: '#00A1E0',
		manageCredentialsUrl: 'https://welcome.salesforce.com/',
		createNewCredentialsUrl: 'https://welcome.salesforce.com/'
	},
	shikimori: {
		logoUrl: '/assets/svg/shikimori-logo.svg',
		name: 'Shikimori',
		primaryColor: '#343434',
		manageCredentialsUrl: 'https://shikimori.one/oauth/applications',
		createNewCredentialsUrl: 'https://shikimori.one/oauth/applications'
	},
	slack: {
		logoUrl: '/assets/png/SLA-Slack-from-Salesforce-logo.png',
		name: 'Slack',
		primaryColor: '#4A154B',
		manageCredentialsUrl: 'https://api.slack.com/apps',
		createNewCredentialsUrl: 'https://api.slack.com/apps'
	},
	spotify: {
		logoUrl: '/assets/svg/spotify-Primary_Logo_Green_RGB.svg',
		name: 'Spotify',
		primaryColor: '#1ED760',
		manageCredentialsUrl: 'https://developer.spotify.com/dashboard',
		createNewCredentialsUrl:
			'https://developer.spotify.com/dashboard/create'
	},
	startgg: {
		logoUrl: '/assets/svg/start.gg_Icon_RGB.svg',
		name: 'Start.gg',
		primaryColor: '#2E75BA',
		manageCredentialsUrl: 'https://developer.start.gg/docs/authentication',
		createNewCredentialsUrl:
			'https://developer.start.gg/docs/authentication'
	},
	strava: {
		logoUrl: '/assets/svg/strava-logo.svg',
		name: 'Strava',
		primaryColor: '#FC4C02',
		manageCredentialsUrl: 'https://www.strava.com/settings/api',
		createNewCredentialsUrl: 'https://www.strava.com/settings/api'
	},
	synology: {
		logoUrl: '/assets/png/Synology_logo_Standard.png',
		name: 'Synology',
		primaryColor: '#B5B5B6',
		manageCredentialsUrl:
			'https://kb.synology.com/en-us/DSM/help/OAuthService/oauth_service_desc',
		createNewCredentialsUrl:
			'https://kb.synology.com/en-us/DSM/help/OAuthService/oauth_service_desc'
	},
	tiktok: {
		logoUrl: '/assets/svg/tiktok-logo.svg',
		name: 'TikTok',
		primaryColor: '#000000',
		manageCredentialsUrl: 'https://developers.tiktok.com/apps',
		createNewCredentialsUrl: 'https://developers.tiktok.com/apps'
	},
	tiltify: {
		logoUrl: '/assets/svg/rgb-tiltify22_mark_blue.svg',
		name: 'Tiltify',
		primaryColor: '#143DF4',
		manageCredentialsUrl: 'https://app.tiltify.com/developers',
		createNewCredentialsUrl: 'https://app.tiltify.com/developers'
	},
	tumblr: {
		logoUrl: '/assets/svg/tumblr.svg',
		name: 'Tumblr',
		primaryColor: '#36465D',
		manageCredentialsUrl: 'https://www.tumblr.com/oauth/apps',
		createNewCredentialsUrl: 'https://www.tumblr.com/oauth/register'
	},
	twitch: {
		logoUrl: '/assets/svg/twitch-glitch_flat_purple.svg',
		name: 'Twitch',
		primaryColor: '#9146FF',
		manageCredentialsUrl: 'https://dev.twitch.tv/console/apps',
		createNewCredentialsUrl: 'https://dev.twitch.tv/console/apps/create'
	},
	twitter: {
		logoUrl: '/assets/png/twitter-logo-black.png',
		name: 'Twitter / X',
		primaryColor: '#000000',
		manageCredentialsUrl:
			'https://developer.twitter.com/en/portal/dashboard',
		createNewCredentialsUrl:
			'https://developer.twitter.com/en/portal/projects-and-apps'
	},
	vk: {
		logoUrl: '/assets/svg/vk-logo.svg',
		name: 'VK',
		primaryColor: '#0077FF',
		manageCredentialsUrl: 'https://dev.vk.com/ru/admin/apps-list',
		createNewCredentialsUrl: 'https://dev.vk.com/ru/admin/create-app'
	},
	withings: {
		logoUrl: '/assets/svg/withings-logo.svg',
		name: 'Withings',
		primaryColor: '#00A0DC',
		manageCredentialsUrl: 'https://developer.withings.com/dashboard/',
		createNewCredentialsUrl:
			'https://developer.withings.com/dashboard/create'
	},
	workos: {
		logoUrl: '/assets/svg/workos-logo-color.svg',
		name: 'WorkOS',
		primaryColor: '#6363F1',
		manageCredentialsUrl: 'https://dashboard.workos.com',
		createNewCredentialsUrl: 'https://dashboard.workos.com'
	},
	yahoo: {
		logoUrl: '/assets/jpeg/yahoo-Icon.jpeg',
		name: 'Yahoo',
		primaryColor: '#5F01D1',
		manageCredentialsUrl: 'https://developer.yahoo.com/apps',
		createNewCredentialsUrl: 'https://developer.yahoo.com/apps/create/'
	},
	yandex: {
		logoUrl: '/assets/svg/yandex-icon_grad_circ.svg',
		name: 'Yandex',
		primaryColor: '#5282FF',
		manageCredentialsUrl: 'https://oauth.yandex.com/client/my',
		createNewCredentialsUrl: 'https://oauth.yandex.com/client/new'
	},
	zoom: {
		logoUrl: '/assets/png/Zoom_Logo_Bloom_RGB.png',
		name: 'Zoom',
		primaryColor: '#0B5CFF',
		manageCredentialsUrl: 'https://marketplace.zoom.us/user/build',
		createNewCredentialsUrl: 'https://marketplace.zoom.us/develop/create'
	}
};
