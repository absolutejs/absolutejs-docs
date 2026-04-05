import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type ScopedStateUserCardsProps = ThemeProps & {
	isMobile: boolean;
};

export const ScopedStateUserCards = ({
	isMobile,
	themeSprings
}: ScopedStateUserCardsProps) => (
	<div
		style={{
			display: 'grid',
			gap: '1rem',
			gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
			marginBottom: '1.5rem',
			marginTop: '1.5rem'
		}}
	>
		<animated.div style={featureCardStyle(themeSprings)}>
			<p
				style={{
					...paragraphSpacedStyle,
					marginBottom: '0.5rem'
				}}
			>
				<strong style={strongStyle}>User A</strong>
			</p>
			<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
				Visits <code>/api/count</code> → sees 0
				<br />
				Calls <code>/api/increment</code> → sees 1
				<br />
				Calls <code>/api/increment</code> → sees 2
			</p>
		</animated.div>
		<animated.div style={featureCardStyle(themeSprings)}>
			<p
				style={{
					...paragraphSpacedStyle,
					marginBottom: '0.5rem'
				}}
			>
				<strong style={strongStyle}>User B</strong>
			</p>
			<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
				Visits <code>/api/count</code> → sees 0 (own state)
				<br />
				Calls <code>/api/increment</code> → sees 1
				<br />
				Independent from User A
			</p>
		</animated.div>
	</div>
);
