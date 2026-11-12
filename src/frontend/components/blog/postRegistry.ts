import type { BlogPost, ReadingTime } from '@absolutejs/blog';
import type { ReactNode } from 'react';
import { choosePerRouteStyles } from '../../styles/choosePerRouteStyles';
import { citraArticleStyles } from '../../styles/citraArticleStyles';
import { ChoosePerRouteContent } from './choosePerRoute/ChoosePerRouteContent';
import { CitraArticleContent } from './CitraArticleContent';

export type ArticleContentProps = {
	post: BlogPost;
	readingTime: ReadingTime | null;
};

export type ArticleEntry = {
	bodyClassName: string;
	Content: (props: ArticleContentProps) => ReactNode;
	footer: { detail: string; title: string };
	styles: string;
};

const articleEntries: Record<string, ArticleEntry> = {
	'choose-per-route': {
		bodyClassName: 'cpr-blog-document',
		Content: ChoosePerRouteContent,
		footer: {
			detail: 'One server. Any frontend, per route.',
			title: 'AbsoluteJS · Choose Per Route'
		},
		styles: choosePerRouteStyles
	},
	'why-citra': {
		bodyClassName: 'citra-blog-document',
		Content: CitraArticleContent,
		footer: {
			detail: '78 provider configurations, one request engine.',
			title: 'Citra · OAuth2 for TypeScript'
		},
		styles: citraArticleStyles
	}
};

export const getArticleEntry = (slug: string) => articleEntries[slug];
