import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

type PrerequisiteItemProps = {
	platform: string;
	commands: Array<string>;
};

const PrerequisiteItem = ({ platform, commands }: PrerequisiteItemProps) => (
	<li style={listItemStyle}>
		<strong style={strongStyle}>{platform}</strong>:{' '}
		{commands.map((cmd, index) => (
			<span key={cmd}>
				{index > 0 && <>{' or '}</>}
				<code>{cmd}</code>
			</span>
		))}
	</li>
);

export const PrerequisitesList = () => (
	<ul style={listStyle}>
		<PrerequisiteItem commands={['brew install mkcert']} platform="macOS" />
		<PrerequisiteItem
			commands={['sudo apt install mkcert', 'yay -S mkcert']}
			platform="Linux"
		/>
		<PrerequisiteItem
			commands={['choco install mkcert']}
			platform="Windows"
		/>
	</ul>
);
