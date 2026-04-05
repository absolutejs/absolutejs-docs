import { CSSProperties } from 'react';
import { FaServer, FaCode, FaExchangeAlt } from 'react-icons/fa';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { tableCodeStyle } from '../../../styles/docsStyles';
import { HTMXAIHowItWorksCard } from './HTMXAIHowItWorksCard';

type HTMXAIHowItWorksSectionProps = {
	themeSprings: ThemeSprings;
};

const iconStyle: CSSProperties = {
	fontSize: '1.5rem',
	marginBottom: '0.5rem',
	opacity: 0.7
};

export const HTMXAIHowItWorksSection = ({
	themeSprings
}: HTMXAIHowItWorksSectionProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '0.75rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
				marginTop: '0.5rem'
			}}
		>
			<HTMXAIHowItWorksCard
				description={
					<>
						User submits via{' '}
						<code style={tableCodeStyle}>hx-post</code>
					</>
				}
				icon={<FaCode style={iconStyle} />}
				themeSprings={themeSprings}
				title="Form POST"
			/>
			<HTMXAIHowItWorksCard
				description="Server returns SSE-connected container"
				icon={<FaServer style={iconStyle} />}
				themeSprings={themeSprings}
				title="HTML + SSE"
			/>
			<HTMXAIHowItWorksCard
				description={
					<>
						Chunks stream as rendered HTML via{' '}
						<code style={tableCodeStyle}>sse-swap</code>
					</>
				}
				icon={<FaExchangeAlt style={iconStyle} />}
				themeSprings={themeSprings}
				title="HTML Fragments"
			/>
		</div>
	);
};
