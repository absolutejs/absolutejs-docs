import { animated } from '@react-spring/web';
import { CSSProperties, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';
import { isMenuDropdown } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';

type NavItem = {
	id: string;
	label: string;
};

type DocsNavigationProps = {
	currentPageId: string;
	onNavigate: (pageId: string) => void;
	themeSprings: ThemeSprings;
};

const containerStyle: CSSProperties = {
	borderTop: '1px solid rgba(160, 231, 229, 0.2)',
	display: 'flex',
	gap: '1rem',
	justifyContent: 'space-between',
	marginTop: '3rem',
	paddingTop: '2rem'
};

const navButtonStyle = (
	themeSprings: ThemeSprings,
	direction: 'prev' | 'next'
) => ({
	alignItems: direction === 'prev' ? 'flex-start' : 'flex-end',
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(160, 231, 229, 0.08)'
			: 'rgba(160, 231, 229, 0.12)'
	),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '1px solid rgba(160, 231, 229, 0.2)'
			: '1px solid rgba(160, 231, 229, 0.3)'
	),
	borderRadius: '0.75rem',
	cursor: 'pointer',
	display: 'flex',
	flex: 1,
	flexDirection: 'column' as const,
	gap: '0.5rem',
	maxWidth: 'calc(50% - 0.5rem)',
	padding: '1rem 1.25rem',
	textAlign: direction as 'left' | 'right',
	textDecoration: 'none',
	transition: 'all 0.2s ease'
});

const directionLabelStyle: CSSProperties = {
	alignItems: 'center',
	color: 'rgba(160, 231, 229, 0.8)',
	display: 'flex',
	fontSize: '0.8rem',
	fontWeight: 500,
	gap: '0.5rem',
	textTransform: 'uppercase'
};

const pageLabelStyle = (themeSprings: ThemeSprings) => ({
	color: themeSprings.contrastPrimary,
	fontSize: '1rem',
	fontWeight: 600
});

export const DocsNavigation = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsNavigationProps) => {
	const flattenedPages = useMemo(() => {
		const pages: NavItem[] = [];

		for (const section of sidebarData) {
			if (isMenuDropdown(section)) {
				for (const button of section.buttons) {
					pages.push({ id: button.id, label: button.label });
				}
			} else {
				pages.push({ id: section.id, label: section.label });
			}
		}

		return pages;
	}, []);

	const currentIndex = flattenedPages.findIndex(
		(page) => page.id === currentPageId
	);
	const prevPage = currentIndex > 0 ? flattenedPages[currentIndex - 1] : null;
	const nextPage =
		currentIndex < flattenedPages.length - 1
			? flattenedPages[currentIndex + 1]
			: null;

	const handleClick = (pageId: string) => {
		onNavigate(pageId);
		window.scrollTo({ behavior: 'smooth', top: 0 });
	};

	return (
		<div style={containerStyle}>
			{prevPage ? (
				<animated.button
					onClick={() => handleClick(prevPage.id)}
					style={navButtonStyle(themeSprings, 'prev')}
				>
					<span style={directionLabelStyle}>
						<FaArrowLeft size={12} />
						Previous
					</span>
					<animated.span style={pageLabelStyle(themeSprings)}>
						{prevPage.label}
					</animated.span>
				</animated.button>
			) : (
				<div style={{ flex: 1, maxWidth: 'calc(50% - 0.5rem)' }} />
			)}

			{nextPage ? (
				<animated.button
					onClick={() => handleClick(nextPage.id)}
					style={navButtonStyle(themeSprings, 'next')}
				>
					<span
						style={{
							...directionLabelStyle,
							justifyContent: 'flex-end'
						}}
					>
						Next
						<FaArrowRight size={12} />
					</span>
					<animated.span style={pageLabelStyle(themeSprings)}>
						{nextPage.label}
					</animated.span>
				</animated.button>
			) : (
				<div style={{ flex: 1, maxWidth: 'calc(50% - 0.5rem)' }} />
			)}
		</div>
	);
};
