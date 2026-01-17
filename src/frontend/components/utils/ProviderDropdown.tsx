import { animated } from '@react-spring/web';
import { ProviderOption, providerOptions } from 'citra';
import { Dispatch, SetStateAction } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { providerData } from '../../data/providerData';

type ProviderDropdownProps = {
	setCurrentProvider: Dispatch<
		SetStateAction<Lowercase<ProviderOption> | undefined>
	>;
	themeSprings: ThemeSprings;
};

export const ProviderDropdown = ({
	setCurrentProvider,
	themeSprings
}: ProviderDropdownProps) => (
	<animated.select
		defaultValue={-1}
		onChange={(event) => {
			const index = parseInt(event.target.value);

			if (index < 0) {
				setCurrentProvider(undefined);
			} else {
				setCurrentProvider(providerOptions[index]);
			}
		}}
		style={{
			backgroundColor: themeSprings.themeTertiary,
			border: '1px solid rgba(128, 128, 128, 0.12)',
			borderRadius: '10px',
			color: themeSprings.contrastPrimary,
			cursor: 'pointer',
			fontSize: '0.9rem',
			fontWeight: 500,
			padding: '14px 20px',
			width: '100%'
		}}
	>
		<option value={-1}>Select another provider</option>
		{providerOptions.map((provider, index) => (
			<option key={provider} value={index}>
				{providerData[provider].name}
			</option>
		))}
	</animated.select>
);
