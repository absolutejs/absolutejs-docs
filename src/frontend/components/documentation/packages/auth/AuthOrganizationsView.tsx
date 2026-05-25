import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	invitations,
	organizationsSetup,
	protectPermissionUsage,
	rolesResolver
} from '../../../../data/documentation/authOrganizationsDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#organizations', label: 'Organizations' },
	{ href: '#invitations', label: 'Invitations' },
	{ href: '#roles', label: 'Roles & Permissions' },
	{ href: '#protect-permission', label: 'protectPermission' }
];

export const AuthOrganizationsView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="auth-organizations" style={h1Style(isMobileOrTablet)}>
						Organizations &amp; RBAC
					</h1>
					<p style={paragraphLargeStyle}>
						First-class multi-tenancy: organizations, memberships, and
						email invitations, plus org-scoped roles and a turnkey
						permission check. This is the tenant spine the SSO, SCIM,
						and authorization blocks hang off.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="organizations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Organizations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The organizations block adds an Organization entity and
						user-to-org memberships, backed by one cohesive
						OrganizationStore (in-memory, Postgres, or Neon). Creating
						an org makes the caller its owner.
					</p>
					<PrismPlus
						codeString={organizationsSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="invitations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Invitations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Invite teammates by email with a single-use,
						hashed-at-rest token (the plaintext is returned once for
						your email link). Accepting turns the invite into an active
						membership. The whole flow is also exposed as pure
						operations.
					</p>
					<PrismPlus
						codeString={invitations}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="roles"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Roles &amp; Permissions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define org-scoped (or global) roles as slugs mapped to
						permission slugs. createMembershipPermissionResolver turns
						a member&apos;s roles into a ready-made hasPermission hook,
						so RBAC is plug-and-play — the package stays
						schema-agnostic.
					</p>
					<PrismPlus
						codeString={rolesResolver}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="protect-permission"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						protectPermission
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Gate any route on a permission. The decision is fully
						delegated to your hook, so it works with the built-in
						resolver or any custom RBAC/ABAC scheme.
					</p>
					<PrismPlus
						codeString={protectPermissionUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
