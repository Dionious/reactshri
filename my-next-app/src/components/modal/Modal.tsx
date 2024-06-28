'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/Modal.module.css';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
	return ReactDOM.createPortal(
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
    document.getElementById('modal-root')! // Привязка к корневому элементу портала
	);
};

export default Modal;
