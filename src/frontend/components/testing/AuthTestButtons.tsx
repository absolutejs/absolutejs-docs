import {
	isRefreshableProviderOption,
	isRevocableProviderOption,
	ProviderOption
} from 'citra';
import { opButtonStyle } from '../../styles/authModalStyles';
import { primaryColor } from '../../styles/styles';
import { ProviderInfo } from '../../data/providerData';
import { CSSProperties } from 'react';
import { Provider } from '../../../../db/schema';
import { UseQueryResult } from '@tanstack/react-query';
import { renderBadge } from '../utils/renderBadge';

const containerStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.5rem'
};

type AuthTestButtonsProps = {
	modalContent: (ProviderInfo & { providerOption: ProviderOption }) | null;
	providerStatuses: UseQueryResult<Omit<Provider, 'name'> | null>;
	provider: string | undefined;
	fetchProfile: () => Promise<void>;
	handleRefresh: () => Promise<void>;
	handleRevocation: () => Promise<void>;
};

export const AuthTestButtons = ({
	modalContent,
	providerStatuses,
	provider,
	fetchProfile,
	handleRefresh,
	handleRevocation
}: AuthTestButtonsProps) => {
	if (!modalContent) return null;
	const { providerOption } = modalContent;
	const isAuthorized = provider === providerOption;
	const isRefreshable =
		isAuthorized && isRefreshableProviderOption(providerOption);
	const isRevocable =
		isAuthorized && isRevocableProviderOption(providerOption);

	const actions = [
		{
			label: 'Authorize User',
			keyName: 'authorizeStatus',
			href: `/oauth2/${providerOption}/authorization`,
			disabled: false
		},
		{
			label: 'Fetch Profile',
			keyName: 'profileStatus',
			onClick: fetchProfile,
			disabled: !isAuthorized
		},
		{
			label: 'Refresh Token',
			keyName: 'refreshStatus',
			onClick: handleRefresh,
			disabled: !isRefreshable
		},
		{
			label: 'Revoke Token',
			keyName: 'revokeStatus',
			onClick: handleRevocation,
			disabled: !isRevocable
		}
	] as const;

	type Action = (typeof actions)[number];

	return (
		<nav
			style={{
				display: 'grid',
				gap: '12px',
				gridTemplateColumns: '1fr 1fr'
			}}
		>
			{actions.map((action: Action) => (
				<div style={containerStyle} key={action.label}>
					{renderBadge(
						providerStatuses.data?.[action.keyName] ?? 'failed'
					)}
					{'href' in action ? (
						<a
							href={action.href}
							style={opButtonStyle(action.disabled, primaryColor)}
						>
							{action.label}
						</a>
					) : (
						<button
							disabled={action.disabled}
							onClick={action.onClick}
							style={opButtonStyle(action.disabled, primaryColor)}
						>
							{action.label}
						</button>
					)}
				</div>
			))}
		</nav>
	);
};
