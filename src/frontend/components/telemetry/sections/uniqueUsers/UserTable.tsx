import { Ref } from 'react';
import { ThemeSprings } from '../../../../../types/springTypes';
import { UserTableRow } from './UserTableRow';
import { UniqueUser } from './uniqueUsersTypes';
import {
	HALF,
	tableStyle,
	thStyle,
	UserColumn,
	userColumns
} from './uniqueUsersStyles';

type UserTableProps = {
	users: UniqueUser[];
	expandedUser: string | null;
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

export const UserTable = ({
	users,
	expandedUser,
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
}: UserTableProps) => (
	<div style={{ marginTop: '1rem', overflowX: 'auto' }}>
		<table style={tableStyle}>
			<thead>
				<tr>
					{userColumns.map((col) => (
						<th key={col} style={thStyle}>
							{col}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{users.length === 0 ? (
					<tr>
						<td
							colSpan={userColumns.length}
							style={{
								opacity: HALF,
								padding: '2rem',
								textAlign: 'center'
							}}
						>
							No users found
						</td>
					</tr>
				) : (
					users.map((user) => (
						<UserTableRow
							editingId={editingId}
							editValue={editValue}
							formatCell={formatCell}
							isExpanded={expandedUser === user.anonymous_id}
							key={user.anonymous_id}
							labelInputRef={labelInputRef}
							labels={labels}
							onBlur={onBlur}
							onCancelEdit={onCancelEdit}
							onEditValueChange={onEditValueChange}
							onSave={onSave}
							onStartEdit={onStartEdit}
							onToggleExpand={onToggleExpand}
							themeSprings={themeSprings}
							user={user}
						/>
					))
				)}
			</tbody>
		</table>
	</div>
);
