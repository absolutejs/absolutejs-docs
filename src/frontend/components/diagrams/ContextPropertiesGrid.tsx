import { CONTEXT_PROPERTIES_GRID_LAYOUT } from '../../../constants';
import { ContextPropertyCard } from './ContextPropertyCard';

type DiagramColors = {
	accent: string;
	accentSecondary: string;
	accentTertiary: string;
	text: string;
	textMuted: string;
};

type ContextPropertiesGridProps = {
	cardGap: number;
	cardHeight: number;
	cardWidth: number;
	colors: DiagramColors;
	rowGap: number;
};

export const ContextPropertiesGrid = ({
	cardGap,
	cardHeight,
	cardWidth,
	colors,
	rowGap
}: ContextPropertiesGridProps) => (
	<g transform="translate(25, 75)">
		{/* Row 1 - Request Input */}
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="params.id"
			color={colors.accent}
			descriptionLines={[
				'Path parameters',
				'extracted from URL',
				'e.g. /user/:id'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="params"
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="query.limit"
			color={colors.accent}
			descriptionLines={[
				'Query string values',
				'after the ? in URL',
				'e.g. ?limit=10'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="query"
			transform={`translate(${cardWidth + cardGap}, 0)`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="body.email"
			color={colors.accent}
			descriptionLines={[
				'Request payload',
				'JSON, form data,',
				'or file uploads'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="body"
			transform={`translate(${(cardWidth + cardGap) * 2}, 0)`}
		/>

		{/* Row 2 - Request Input continued */}
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="headers.auth"
			color={colors.accent}
			descriptionLines={[
				'HTTP request headers',
				'Content-Type, Auth,',
				'User-Agent, etc.'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="headers"
			transform={`translate(0, ${cardHeight + rowGap})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="cookie.session"
			color={colors.accent}
			descriptionLines={[
				'Reactive cookie store',
				'Read/write cookies',
				'via .value property'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="cookie"
			transform={`translate(${cardWidth + cardGap}, ${cardHeight + rowGap})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="/users/123"
			color={colors.accent}
			descriptionLines={[
				'URL pathname',
				'The resource path',
				'being requested'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="path"
			transform={`translate(${(cardWidth + cardGap) * 2}, ${cardHeight + rowGap})`}
		/>

		{/* Row 3 - Response Control */}
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="set.status = 201"
			color={colors.accentSecondary}
			descriptionLines={[
				'Response config',
				'Modify status and',
				'response headers'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="set"
			transform={`translate(0, ${(cardHeight + rowGap) * 2})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="return status(201)"
			color={colors.accentSecondary}
			descriptionLines={[
				'Return with status',
				'Enables TypeScript',
				'type narrowing'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="status"
			transform={`translate(${cardWidth + cardGap}, ${(cardHeight + rowGap) * 2})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="redirect('/login')"
			color={colors.accentSecondary}
			descriptionLines={[
				'Redirect to URL',
				'Supports custom',
				'status (301, 302)'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="redirect"
			transform={`translate(${(cardWidth + cardGap) * 2}, ${(cardHeight + rowGap) * 2})`}
		/>

		{/* Row 4 - Advanced */}
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="request.url"
			color={colors.accentTertiary}
			descriptionLines={[
				'Web Standard',
				'Request object for',
				'low-level access'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="request"
			transform={`translate(0, ${(cardHeight + rowGap) * CONTEXT_PROPERTIES_GRID_LAYOUT.advancedRowIndex})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="store.db"
			color={colors.accentTertiary}
			descriptionLines={[
				'Global mutable state',
				'for Elysia instance',
				'Shared across reqs'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="store"
			transform={`translate(${cardWidth + cardGap}, ${(cardHeight + rowGap) * CONTEXT_PROPERTIES_GRID_LAYOUT.advancedRowIndex})`}
		/>
		<ContextPropertyCard
			cardHeight={cardHeight}
			cardWidth={cardWidth}
			codeExample="user, auth, etc."
			color={colors.accentTertiary}
			descriptionLines={[
				'Custom properties',
				'added via .derive()',
				'or .state()'
			]}
			textColor={colors.text}
			textMutedColor={colors.textMuted}
			title="...derived"
			transform={`translate(${(cardWidth + cardGap) * 2}, ${(cardHeight + rowGap) * CONTEXT_PROPERTIES_GRID_LAYOUT.advancedRowIndex})`}
		/>
	</g>
);
