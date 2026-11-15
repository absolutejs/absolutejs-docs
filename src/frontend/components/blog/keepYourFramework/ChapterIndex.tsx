import { chapterFrameworks, frameworkColor } from './frameworks';

// The six chapters as a jump list: each row names the framework's usual
// home and links to what it gains here.
export const ChapterIndex = () => (
	<nav aria-label="Chapters" className="kyf-index">
		<ol>
			{chapterFrameworks.map((framework) => (
				<li key={framework.key} style={frameworkColor(framework.color)}>
					<a href={`#${framework.chapterId}`}>
						<span className="kyf-index-name">{framework.name}</span>
						<span className="kyf-index-home">
							Usually: {framework.home}
						</span>
						<span className="kyf-index-gain">{framework.gain}</span>
					</a>
				</li>
			))}
		</ol>
	</nav>
);
