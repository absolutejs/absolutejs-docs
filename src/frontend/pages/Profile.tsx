import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfoRows } from '../components/profile/ProfileInfoRows';
import { ProviderBadge } from '../components/profile/ProviderBadge';
import { SignOutButton } from '../components/profile/SignOutButton';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { isProviderKey, providerData } from '../data/providerData';
import { DARK_LOGO_PROVIDERS } from '../styles/authModalStyles';

type ProfileProps = {
	user: User;
	theme: ThemeMode | undefined;
};

const getNameParts = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.filter((part) => part.length > 0);

const getAuthProviderKey = (authSub: string) => {
	const [providerKey] = authSub.split('|');
	if (!providerKey || !authSub.includes('|')) return undefined;

	return providerKey.toLowerCase();
};

const getMetadataDisplayName = (user: User) => {
	if (typeof user.metadata?.name === 'string') return user.metadata.name;
	if (typeof user.metadata?.display_name === 'string')
		return user.metadata.display_name;
	if (typeof user.metadata?.given_name === 'string')
		return user.metadata.given_name;

	return undefined;
};

const deriveInitials = (user: User) => {
	const name = getMetadataDisplayName(user);

	if (name) {
		const parts = getNameParts(name);
		const firstInitial = parts[0]?.[0];
		const lastPartIndex = parts.length - 1;
		const lastInitial = parts[lastPartIndex]?.[0];
		const hasTwoParts = parts.length >= 2;
		if (hasTwoParts && firstInitial && lastInitial) {
			return `${firstInitial}${lastInitial}`.toUpperCase();
		}

		return name.slice(0, 2).toUpperCase();
	}

	const provider = getAuthProviderKey(user.auth_sub);
	if (provider) {
		const map: Record<string, string> = {
			apple: 'A',
			discord: 'D',
			facebook: 'FB',
			github: 'GH',
			google: 'G',
			linkedin: 'LI',
			microsoft: 'MS',
			spotify: 'SP',
			twitter: 'X'
		};

		return map[provider] ?? provider.slice(0, 2).toUpperCase();
	}

	return '?';
};

const getProviderKey = (authSub: string) => getAuthProviderKey(authSub);

const getProviderDisplay = (providerKey: string) =>
	providerKey.charAt(0).toUpperCase() + providerKey.slice(1);

const SKIP_KEYS = new Set([
	'profile_picture',
	'picture',
	'avatar_url',
	'image'
]);

const formatKey = (key: string) =>
	key
		.replace(/_/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/\b\w/g, (character) => character.toUpperCase());

const formatValue = (value: unknown) => {
	if (typeof value === 'string') return value || undefined;
	if (typeof value === 'number') return String(value);
	if (typeof value === 'boolean') return value ? 'Yes' : 'No';
	if (value === null || value === undefined) return undefined;
	if (Array.isArray(value)) return value.join(', ') || undefined;
	if (typeof value === 'object') return JSON.stringify(value);

	return String(value);
};

const extractMetadataFields = (metadata: Record<string, unknown>) => {
	const fields: { label: string; value: string }[] = [];

	for (const [key, value] of Object.entries(metadata)) {
		if (SKIP_KEYS.has(key)) continue;
		const formatted = formatValue(value);
		if (!formatted) continue;

		fields.push({ label: formatKey(key), value: formatted });
	}

	return fields;
};

export const Profile = ({ user, theme }: ProfileProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const initials = deriveInitials(user);
	const providerKey = getProviderKey(user.auth_sub);
	let provider;
	if (providerKey && isProviderKey(providerKey)) {
		provider = providerData[providerKey];
	}
	const providerDisplay = providerKey
		? getProviderDisplay(providerKey)
		: 'Unknown';

	const displayName = getMetadataDisplayName(user);

	const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	const metadataFields = user.metadata
		? extractMetadataFields(user.metadata)
		: [];

	const isDarkLogo = providerKey
		? DARK_LOGO_PROVIDERS.has(providerKey)
		: false;

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="Profile | AbsoluteJS" />
			<animated.body
				style={{
					...bodyDefault(themeSprings),
					position: 'relative'
				}}
			>
				<AuroraBackground themeSprings={themeSprings} />
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main
					style={{
						...mainDefault(),
						padding: '3rem 1.5rem',
						position: 'relative',
						zIndex: 1
					}}
				>
					<animated.div
						style={{
							backdropFilter: 'blur(12px)',
							background: themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? 'rgba(39, 39, 42, 0.5)'
									: 'rgba(255, 255, 255, 0.8)'
							),
							border: '1px solid rgba(128, 128, 128, 0.12)',
							borderRadius: '16px',
							display: 'flex',
							flexDirection: 'column',
							maxWidth: '720px',
							padding: '2.5rem',
							width: '100%'
						}}
					>
						<ProfileHeader
							displayName={displayName}
							initials={initials}
							themeSprings={themeSprings}
							userImage={
								typeof user.metadata?.profile_picture ===
								'string'
									? user.metadata.profile_picture
									: undefined
							}
						/>

						<ProviderBadge
							isDarkLogo={isDarkLogo}
							logoUrl={provider?.logoUrl}
							providerDisplay={providerDisplay}
							themeSprings={themeSprings}
						/>

						<ProfileInfoRows
							memberSince={memberSince}
							metadataFields={metadataFields}
							themeSprings={themeSprings}
						/>

						<SignOutButton themeSprings={themeSprings} />
					</animated.div>
				</main>
			</animated.body>
		</html>
	);
};
