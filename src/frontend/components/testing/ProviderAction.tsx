import { UseQueryResult } from '@tanstack/react-query';
import { Provider } from '../../../../db/schema';
import {
	buttonContainerStyle,
	opButtonStyle
} from '../../styles/authModalStyles';
import { primaryColor } from '../../styles/styles';
import { renderBadge } from '../utils/renderBadge';

type ProviderActionProps = {
	keyName:
		| 'authorizeStatus'
		| 'profileStatus'
		| 'refreshStatus'
		| 'revokeStatus';
	providerStatuses: UseQueryResult<Omit<Provider, 'name'> | null>;
	type: 'button' | 'link';
	href?: string;
	disabled: boolean;
	label: string;
	onClick?: () => void;
};

export const ProviderAction = ({
	keyName,
	providerStatuses,
	type,
	href,
	disabled,
	label,
	onClick
}: ProviderActionProps) => (
	<div style={buttonContainerStyle}>
		{renderBadge(providerStatuses.data?.[keyName] ?? 'failed')}
		{type === 'link' ? (
			<a href={href} style={opButtonStyle(disabled, primaryColor)}>
				{label}
			</a>
		) : (
			<button
				disabled={disabled}
				onClick={onClick}
				style={opButtonStyle(disabled, primaryColor)}
			>
				{label}
			</button>
		)}
	</div>
);
