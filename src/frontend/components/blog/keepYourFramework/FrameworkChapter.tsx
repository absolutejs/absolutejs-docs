import type { ReactNode } from 'react';
import {
	chapterFrameworks,
	frameworkColor,
	type FrameworkKey
} from './frameworks';

type LedgerSide = { items: ReactNode[]; label: string };

type FrameworkChapterProps = {
	children: ReactNode;
	framework: FrameworkKey;
	here: ReactNode[];
	home: LedgerSide;
	title: string;
};

// Every chapter has the same shape so a reader can skip to their framework
// and compare: the file tab, the heading, then "at home" set back on the
// left and "here" in full ink on the right, then the prose and code.
export const FrameworkChapter = ({
	children,
	framework,
	here,
	home,
	title
}: FrameworkChapterProps) => {
	const entry = chapterFrameworks.find((item) => item.key === framework);
	if (entry === undefined) return null;

	return (
		<section
			aria-labelledby={`${entry.chapterId}-title`}
			className="post-section kyf-chapter"
			id={entry.chapterId}
			style={frameworkColor(entry.color)}
		>
			<div className="kyf-chapter-head">
				<div className="kyf-chapter-tabrow">
					<span aria-hidden="true" className="kyf-tab kyf-tab-static">
						{entry.file}
					</span>
				</div>
				<h2 id={`${entry.chapterId}-title`}>{title}</h2>
			</div>
			<div className="kyf-ledger">
				<div className="kyf-ledger-home">
					<p className="kyf-ledger-label">At home: {home.label}</p>
					<ul>
						{home.items.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
				<div className="kyf-ledger-here">
					<p className="kyf-ledger-label">Here</p>
					<ul>
						{here.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="post-col">{children}</div>
		</section>
	);
};
