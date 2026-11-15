import type { BlogPost, ReadingTime } from '@absolutejs/blog';
import type { ReactNode } from 'react';
import { choosePerRouteStyles } from '../../styles/choosePerRouteStyles';
import { citraArticleStyles } from '../../styles/citraArticleStyles';
import { keepYourFrameworkStyles } from '../../styles/keepYourFrameworkStyles';
import { ChoosePerRouteContent } from './choosePerRoute/ChoosePerRouteContent';
import { CitraArticleContent } from './CitraArticleContent';
import { KeepYourFrameworkContent } from './keepYourFramework/KeepYourFrameworkContent';

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
	'keep-your-framework': {
		bodyClassName: 'kyf-blog-document',
		Content: KeepYourFrameworkContent,
		footer: {
			detail: 'Keep your framework. Lose the package deal.',
			title: 'AbsoluteJS · Keep Your Framework'
		},
		styles: keepYourFrameworkStyles
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
