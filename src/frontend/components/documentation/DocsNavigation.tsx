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
	isMobileOrTablet?: boolean;
	onNavigate: (pageId: string) => void;
	themeSprings: ThemeSprings;
};

const containerStyle: CSSProperties = {
	borderTop: '1px solid rgba(99, 102, 241, 0.15)',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'space-between',
	marginTop: '3rem',
	paddingBottom: '3rem',
	paddingTop: '2rem'
};

const navButtonStyle = (
	themeSprings: ThemeSprings,
	direction: 'prev' | 'next'
) => ({
	alignItems: direction === 'prev' ? 'flex-start' : 'flex-end',
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(99, 102, 241, 0.08)'
			: 'rgba(99, 102, 241, 0.06)'
	),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '1px solid rgba(99, 102, 241, 0.2)'
			: '1px solid rgba(99, 102, 241, 0.15)'
	),
	borderRadius: '0.75rem',
	cursor: 'pointer',
	display: 'flex',
	flex: '1 1 40%',
	flexDirection: 'column' as const,
	gap: '0.5rem',
	minWidth: '160px',
	padding: '1rem 1.25rem',
	textAlign: direction as 'left' | 'right',
	textDecoration: 'none',
	transition: 'all 0.2s ease'
});

const directionLabelStyle = () => ({
	alignItems: 'center',
	color: '#6366F1',
	display: 'flex',
	fontSize: '0.8rem',
	fontWeight: 500,
	gap: '0.5rem',
	textTransform: 'uppercase' as const
});

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
					<animated.span style={directionLabelStyle()}>
						<FaArrowLeft size={12} />
						Previous
					</animated.span>
					<animated.span style={pageLabelStyle(themeSprings)}>
						{prevPage.label}
					</animated.span>
				</animated.button>
			) : (
				<div style={{ flex: '1 1 40%', minWidth: '160px' }} />
			)}

			{nextPage ? (
				<animated.button
					onClick={() => handleClick(nextPage.id)}
					style={navButtonStyle(themeSprings, 'next')}
				>
					<animated.span
						style={{
							...directionLabelStyle(),
							justifyContent: 'flex-end'
						}}
					>
						Next
						<FaArrowRight size={12} />
					</animated.span>
					<animated.span style={pageLabelStyle(themeSprings)}>
						{nextPage.label}
					</animated.span>
				</animated.button>
			) : (
				<div style={{ flex: '1 1 40%', minWidth: '160px' }} />
			)}
		</div>
	);
};
