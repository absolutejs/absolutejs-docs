import type { ReactNode } from 'react';

type DocsLink = { href: string; label: string };

type SideNoteProps = {
	children?: ReactNode;
	docs?: DocsLink[];
	label: string;
};

// Placed before the paragraph it annotates. On wide screens it floats into
// the right margin beside that paragraph; on narrower screens it sits inline.
export const SideNote = ({ children, docs = [], label }: SideNoteProps) => (
	<aside aria-label={label} className="cpr-note">
		<span className="cpr-note-label">{label}</span>
		{children === undefined ? null : <p>{children}</p>}
		{docs.length === 0 ? null : (
			<ul className="cpr-note-links">
				{docs.map((link) => (
					<li key={link.href}>
						<a href={link.href}>{link.label} →</a>
					</li>
				))}
			</ul>
		)}
	</aside>
);
