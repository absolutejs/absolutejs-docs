import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { ProfilePicture } from '../components/utils/ProfilePicture';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { handleSignOut } from '../utils/authFunctions';
import { providerData } from '../data/providerData';
import { DARK_LOGO_PROVIDERS } from '../styles/authModalStyles';

type ProfileProps = {
	user: User;
	theme: ThemeMode | undefined;
};

const deriveInitials = (user: User): string => {
	const name =
		typeof user.metadata?.name === 'string'
			? user.metadata.name
			: typeof user.metadata?.display_name === 'string'
				? user.metadata.display_name
				: typeof user.metadata?.given_name === 'string'
					? user.metadata.given_name
					: undefined;

	if (name) {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) {
			return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
		}
		return name.slice(0, 2).toUpperCase();
	}

	const sub = user.auth_sub;
	if (sub.includes('|')) {
		const provider = sub.split('|')[0]!.toLowerCase();
		const map: Record<string, string> = {
			google: 'G',
			github: 'GH',
			discord: 'D',
			twitter: 'X',
			facebook: 'FB',
			apple: 'A',
			microsoft: 'MS',
			linkedin: 'LI',
			spotify: 'SP'
		};
		return map[provider] ?? provider.slice(0, 2).toUpperCase();
	}

	return '?';
};

const getProviderKey = (authSub: string): string | undefined => {
	if (!authSub.includes('|')) return undefined;
	return authSub.split('|')[0]!.toLowerCase();
};

const getProviderDisplay = (providerKey: string): string =>
	providerKey.charAt(0).toUpperCase() + providerKey.slice(1);

const SKIP_KEYS = new Set([
	'profile_picture',
	'picture',
	'avatar_url',
	'image'
]);

const formatKey = (key: string): string =>
	key
		.replace(/_/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (value: unknown): string | undefined => {
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
		if (formatted) {
			fields.push({ label: formatKey(key), value: formatted });
		}
	}

	return fields;
};

export const Profile = ({ user, theme }: ProfileProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const initials = deriveInitials(user);
	const providerKey = getProviderKey(user.auth_sub);
	const provider = providerKey
		? providerData[providerKey as keyof typeof providerData]
		: undefined;
	const providerDisplay = providerKey
		? getProviderDisplay(providerKey)
		: 'Unknown';

	const displayName =
		typeof user.metadata?.name === 'string'
			? user.metadata.name
			: typeof user.metadata?.display_name === 'string'
				? user.metadata.display_name
				: typeof user.metadata?.given_name === 'string'
					? user.metadata.given_name
					: undefined;

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
			<Head title="Profile — AbsoluteJS" />
			<animated.body
				style={{
					...bodyDefault(themeSprings),
					position: 'relative'
				}}
			>
				<AuroraBackground themeSprings={themeSprings} />
				<Navbar
					themeSprings={themeSprings}
					user={user}
					setTheme={setTheme}
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
							background: themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? 'rgba(39, 39, 42, 0.5)'
									: 'rgba(255, 255, 255, 0.8)'
							),
							backdropFilter: 'blur(12px)',
							border: '1px solid rgba(128, 128, 128, 0.12)',
							borderRadius: '16px',
							display: 'flex',
							flexDirection: 'column',
							maxWidth: '720px',
							padding: '2.5rem',
							width: '100%'
						}}
					>
						{/* Header: Avatar + Name */}
						<div
							style={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								marginBottom: '2rem'
							}}
						>
							<ProfilePicture
								themeSprings={themeSprings}
								userImage={
									typeof user.metadata?.profile_picture ===
									'string'
										? user.metadata.profile_picture
										: undefined
								}
								initials={initials}
								width="5rem"
								height="5rem"
							/>
							{displayName && (
								<animated.h1
									style={{
										color: themeSprings.contrastPrimary,
										fontSize: '1.5rem',
										fontWeight: 700,
										letterSpacing: '-0.025em',
										textAlign: 'center'
									}}
								>
									{displayName}
								</animated.h1>
							)}
						</div>

						{/* Provider badge */}
						<animated.div
							style={{
								alignItems: 'center',
								alignSelf: 'center',
								background: themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? 'rgba(99, 102, 241, 0.1)'
										: 'rgba(99, 102, 241, 0.06)'
								),
								border: '1px solid rgba(99, 102, 241, 0.2)',
								borderRadius: '2rem',
								display: 'flex',
								gap: '0.5rem',
								marginBottom: '1.5rem',
								padding: '0.5rem 1rem'
							}}
						>
							{provider && (
								<animated.img
									src={provider.logoUrl}
									alt={`${providerDisplay} logo`}
									style={{
										filter: isDarkLogo
											? themeSprings.theme.to((t) =>
													t.endsWith('dark')
														? 'brightness(0) invert(1)'
														: 'none'
												)
											: 'none',
										height: '1.125rem',
										objectFit: 'contain',
										width: '1.125rem'
									}}
								/>
							)}
							<animated.span
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '0.8125rem',
									fontWeight: 500
								}}
							>
								Signed in with {providerDisplay}
							</animated.span>
						</animated.div>

						{/* Info rows */}
						<animated.div
							style={{
								borderTop: '1px solid',
								borderTopColor: themeSprings.themeTertiary,
								display: 'flex',
								flexDirection: 'column',
								gap: '0.75rem',
								paddingTop: '1.5rem'
							}}
						>
							<InfoRow
								label="Member since"
								value={memberSince}
								themeSprings={themeSprings}
							/>
							{metadataFields.map((field) => (
								<InfoRow
									key={field.label}
									label={field.label}
									value={field.value}
									themeSprings={themeSprings}
								/>
							))}
						</animated.div>

						{/* Sign out */}
						<animated.div
							style={{
								borderTop: '1px solid',
								borderTopColor: themeSprings.themeTertiary,
								marginTop: '1.5rem',
								paddingTop: '1.5rem'
							}}
						>
							<animated.button
								onClick={() => handleSignOut()}
								style={{
									background:
										'linear-gradient(135deg, #6366F1, #818CF8)',
									border: 'none',
									borderRadius: '8px',
									color: '#FFFFFF',
									cursor: 'pointer',
									fontSize: '0.875rem',
									fontWeight: 600,
									padding: '0.625rem 1.25rem',
									width: '100%'
								}}
							>
								Sign out
							</animated.button>
						</animated.div>
					</animated.div>
				</main>
			</animated.body>
		</html>
	);
};

const InfoRow = ({
	label,
	value,
	themeSprings
}: {
	label: string;
	value: string;
	themeSprings: ReturnType<typeof useTheme>[0];
}) => (
	<div
		style={{
			alignItems: 'flex-start',
			display: 'flex',
			justifyContent: 'space-between',
			gap: '1rem'
		}}
	>
		<animated.span
			style={{
				color: themeSprings.contrastSecondary,
				flexShrink: 0,
				fontSize: '0.8125rem',
				opacity: 0.6
			}}
		>
			{label}
		</animated.span>
		<animated.span
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '0.8125rem',
				fontWeight: 500,
				overflow: 'hidden',
				textAlign: 'right',
				textOverflow: 'ellipsis',
				wordBreak: 'break-all'
			}}
		>
			{value}
		</animated.span>
	</div>
);
