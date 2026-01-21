import { animated } from '@react-spring/web';
import { ReactNode, MouseEvent, CSSProperties, RefCallback } from 'react';
import { AnimatedCSSProperties } from '../../../types/springTypes';

type ModalProps = {
	isOpen: boolean;
	onClose?: () => void;
	children: ReactNode;
	style?: CSSProperties | AnimatedCSSProperties;
	contentRef?: RefCallback<HTMLDivElement>;
};

export const Modal = ({
	style,
	isOpen,
	onClose,
	children,
	contentRef
}: ModalProps) => {
	if (!isOpen) return null;

	return (
		<>
			<div
				onClick={() => onClose?.()}
				style={{
					backdropFilter: 'blur(4px)',
					background: 'rgba(0,0,0,0.5)',
					inset: 0,
					position: 'fixed',
					zIndex: 10000
				}}
			/>
			<animated.dialog
				open
				onCancel={(event) => {
					event.preventDefault();
					onClose?.();
				}}
				onClick={(event: MouseEvent<HTMLDialogElement>) => {
					if (event.target === event.currentTarget) onClose?.();
				}}
				style={{
					alignItems: 'center',
					background: 'transparent',
					border: 'none',
					borderRadius: style?.borderRadius,
					color: 'inherit',
					display: 'flex',
					inset: 0,
					justifyContent: 'center',
					margin: 'auto',
					padding: '0px',
					position: 'fixed',
					zIndex: 10001
				}}
			>
				<animated.div
					ref={contentRef}
					onClick={(event) => event.stopPropagation()}
					style={Object.assign(
						{},
						{
							minWidth: '300px',
							padding: '20px',
							position: 'relative'
						},
						style
					)}
				>
					<button
						onClick={() => onClose?.()}
						aria-label="Close modal"
						style={{
							background: 'transparent',
							border: 'none',
							color: 'inherit',
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
				</animated.div>
			</animated.dialog>
		</>
	);
};
