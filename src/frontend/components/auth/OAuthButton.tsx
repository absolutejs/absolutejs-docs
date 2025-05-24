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
	provider: Lowercase<ProviderOption> | undefined;
	setModalContent: Dispatch<SetStateAction<ProviderInfo | null>>;
};

export const OAuthButton = ({
	provider,
	setModalContent
}: OAuthButtonProps) => {
	const defaultData: ProviderInfo = {
		logoUrl: '/assets/svg/todo-put-file.svg',
		name: 'other provider',
		primaryColor: 'lightgray'
	};

	const { logoUrl, name, primaryColor } =
		provider && providerData[provider]
			? providerData[provider]
			: defaultData;

	const isProviderSelected = provider !== undefined;

	return (
		<button
			style={oauthButtonStyle({
				isProviderSelected,
				providerPrimaryColor: isProviderSelected
					? primaryColor
					: '#999999'
			})}
			onClick={() => {
				setModalContent({
					logoUrl,
					name,
					primaryColor
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
