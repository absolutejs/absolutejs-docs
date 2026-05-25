import { Fragment } from 'react';
import { tableCodeStyle } from '../../styles/docsStyles';

type RichTextProps = {
	text: string;
};

/**
 * Renders a string with `backtick`-delimited spans turned into inline <code>.
 * Keeps doc copy authorable as plain strings while still styling code tokens.
 */
export const RichText = ({ text }: RichTextProps) => {
	const parts = text.split('`');

	return (
		<>
			{parts.map((part, index) =>
				index % 2 === 1 ? (
					<code key={index} style={tableCodeStyle}>
						{part}
					</code>
				) : (
					<Fragment key={index}>{part}</Fragment>
				)
			)}
		</>
	);
};
