import { ReactNode, useEffect, useRef, MouseEvent, CSSProperties } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose?: () => void;
	onOpen?: (dialogRef: HTMLDialogElement | null) => void;
	children: ReactNode;
	style?: CSSProperties;
};

export const Modal = ({
	style,
	isOpen,
	onClose,
	onOpen,
	children
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
			onOpen?.(dialog);
			document.body.style.overflow = 'hidden';
		} else if (dialog.open) {
			dialog.close();
			onClose?.();
			document.body.style.overflow = '';
		}
	}, [isOpen, onClose, onOpen]);

	return (
		<dialog
			ref={dialogRef}
			onCancel={(event) => {
				event.preventDefault();
				onClose?.();
			}}
			onClick={(event: MouseEvent<HTMLDialogElement>) => {
				if (event.target === dialogRef.current) onClose?.();
			}}
			style={{
				alignItems: 'center',
				border: 'none',
				borderRadius: style?.borderRadius,
				display: 'flex',
				inset: 0,
				justifyContent: 'center',
				margin: 'auto',
				padding: '0px',
				position: 'fixed'
			}}
		>
			<style>{`
				dialog::backdrop {
					background: rgba(0,0,0,0.5);
					backdrop-filter: blur(4px);
				}
			`}</style>

			{isOpen && (
				<div
					onClick={(event) => event.stopPropagation()}
					style={{
						...style,
						minWidth: '300px',
						padding: '20px',
						position: 'relative'
					}}
				>
					<button
						onClick={() => {
							dialogRef.current?.close()
							onClose?.();
						}}
						aria-label="Close modal"
						style={{
							background: 'transparent',
							border: 'none',
							cursor: 'pointer',
							fontSize: '16px',
							position: 'absolute',
							right: '10px',
							top: '10px'
						}}
					>
						&times;
					</button>
					{children}
				</div>
			)}
		</dialog>
	);
};
