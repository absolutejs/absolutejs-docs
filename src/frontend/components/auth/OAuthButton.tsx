import { ProviderOption } from 'citra';
import { Dispatch, SetStateAction } from 'react';
import { FiUser } from 'react-icons/fi';
import { providerData, ProviderInfo } from '../../data/providerData';
import {
	oauthButtonStyle,
	oauthButtonContentStyle,
	oauthIconStyle,
	oauthButtonTextStyle
} from '../../styles/authModalStyles';

type OAuthButtonProps = {
	provider: Lowercase<ProviderOption>;
	setModalContent: Dispatch<
		SetStateAction<
			(ProviderInfo & { providerOption: ProviderOption }) | null
		>
	>;
};

export const OAuthButton = ({
	provider,
	setModalContent
}: OAuthButtonProps) => {
	const {
		logoUrl,
		name,
		primaryColor,
		manageCredentialsUrl,
		createNewCredentialsUrl
	} = providerData[provider];

	return (
		<button
			style={oauthButtonStyle({
				providerPrimaryColor: primaryColor
			})}
			onClick={() => {
				setModalContent({
					logoUrl,
					name,
					primaryColor,
					createNewCredentialsUrl,
					manageCredentialsUrl,
					providerOption: provider
				});
			}}
		>
			<div style={oauthButtonContentStyle}>
				{provider ? (
					<img
						src={logoUrl}
						alt={`${name} logo`}
						style={oauthIconStyle}
					/>
				) : (
					<FiUser style={oauthIconStyle} />
				)}
				<span style={oauthButtonTextStyle}>{name}</span>
			</div>
		</button>
	);
};
