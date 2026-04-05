import { Ref } from 'react';
import { ThemeSprings } from '../../../../../types/springTypes';
import { LabelEditCell } from './LabelEditCell';
import { UserDrilldown } from './UserDrilldown';
import { UniqueUser } from './uniqueUsersTypes';
import { tdStyle, UserColumn, userColumns } from './uniqueUsersStyles';

type UserTableRowProps = {
	user: UniqueUser;
	isExpanded: boolean;
	editingId: string | null;
	editValue: string;
	labels: Record<string, string>;
	themeSprings: ThemeSprings;
	labelInputRef: Ref<HTMLInputElement>;
	onToggleExpand: (anonymousId: string) => void;
	onStartEdit: (anonymousId: string, currentLabel: string) => void;
	onEditValueChange: (value: string) => void;
	onSave: (anonymousId: string, value: string) => void;
	onCancelEdit: () => void;
	onBlur: (anonymousId: string) => void;
	formatCell: (user: UniqueUser, col: UserColumn) => string;
};

export const UserTableRow = ({
	user,
	isExpanded,
	editingId,
	editValue,
	labels,
	themeSprings,
	labelInputRef,
	onToggleExpand,
	onStartEdit,
	onEditValueChange,
	onSave,
	onCancelEdit,
	onBlur,
	formatCell
}: UserTableRowProps) => (
	<>
		<tr
			key={user.anonymous_id}
			onClick={() => onToggleExpand(user.anonymous_id)}
			style={{ cursor: 'pointer' }}
		>
			{userColumns.map((col) =>
				col === 'label' ? (
					<LabelEditCell
						anonymousId={user.anonymous_id}
						currentLabel={labels[user.anonymous_id]}
						editValue={editValue}
						isEditing={editingId === user.anonymous_id}
						key={col}
						labelInputRef={labelInputRef}
						onBlur={onBlur}
						onCancelEdit={onCancelEdit}
						onEditValueChange={onEditValueChange}
						onSave={onSave}
						onStartEdit={onStartEdit}
					/>
				) : (
					<td key={col} style={tdStyle}>
						{formatCell(user, col)}
					</td>
				)
			)}
		</tr>
		{isExpanded && (
			<tr key={`${user.anonymous_id}-drilldown`}>
				<td colSpan={userColumns.length} style={{ padding: 0 }}>
					<UserDrilldown
						anonymousId={user.anonymous_id}
						themeSprings={themeSprings}
					/>
				</td>
			</tr>
		)}
	</>
);
