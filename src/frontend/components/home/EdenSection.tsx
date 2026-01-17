import { animated } from '@react-spring/web';
import { FaCheck } from 'react-icons/fa';
import { ThemeProps } from '../../../types/springTypes';
import {
	sectionStyle,
	sectionSubtitleStyle,
	sectionTitleStyle
} from '../../styles/homeStyles';
import { PrismPlus } from '../utils/PrismPlus';

const edenCode = `// Define routes with types on the server
const app = new Elysia()
  .get('/posts', () => db.posts.findMany())
  .post('/posts', ({ body }) => db.posts.create(body))

export type App = typeof app

// Client gets full type inference automatically
const api = treaty<App>('localhost:3000')
const { data } = await api.posts.get()  // data: Post[]`;

const benefits = [
	'Zero code generation',
	'Full IDE autocomplete',
	'Compile-time errors',
	'Under 2KB'
];

export const EdenSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.div
			style={{
				alignItems: 'center',
				background: themeSprings.themeTertiary,
				border: '1px solid rgba(128, 128, 128, 0.12)',
				borderRadius: '24px',
				boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '1200px',
				overflow: 'hidden',
				padding: '3rem 2rem',
				position: 'relative',
				width: '100%'
			}}
		>
			<div
				style={{
					background:
						'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
					borderRadius: '24px',
					height: '100%',
					left: 0,
					position: 'absolute',
					top: 0,
					width: '100%'
				}}
			/>

			<animated.h2
				style={{
					...sectionTitleStyle(themeSprings),
					marginBottom: '0.5rem',
					position: 'relative',
					zIndex: 1
				}}
			>
				End-to-End Type Safety
			</animated.h2>
			<animated.p
				style={{
					...sectionSubtitleStyle(themeSprings),
					marginBottom: '2rem',
					position: 'relative',
					zIndex: 1
				}}
			>
				Eden Treaty connects your frontend to backend with full type
				inference
			</animated.p>

			<div
				style={{
					maxWidth: '100%',
					position: 'relative',
					width: '100%',
					zIndex: 1
				}}
			>
				<PrismPlus
					codeString={edenCode}
					language="typescript"
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>
			</div>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1.5rem',
					justifyContent: 'center',
					position: 'relative',
					zIndex: 1
				}}
			>
				{benefits.map((benefit, index) => (
					<animated.div
						key={index}
						style={{
							alignItems: 'center',
							color: themeSprings.contrastSecondary,
							display: 'flex',
							fontSize: '0.95rem',
							gap: '0.5rem'
						}}
					>
						<span
							style={{
								alignItems: 'center',
								background:
									'linear-gradient(135deg, #6366f1, #8b5cf6)',
								borderRadius: '50%',
								color: '#fff',
								display: 'flex',
								fontSize: '0.6rem',
								height: '20px',
								justifyContent: 'center',
								width: '20px'
							}}
						>
							<FaCheck />
						</span>
						{benefit}
					</animated.div>
				))}
			</div>
		</animated.div>
	</section>
);
