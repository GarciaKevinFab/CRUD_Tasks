import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ModalContainer.module.css'; 

const ModalContainer = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            className={styles.modalContent}
        >
            <div className={styles.modalHeader}>
                <h2 className={styles.title}>{title}</h2>
                <button className={styles.closeButton} onClick={onRequestClose}>
                    <FontAwesomeIcon icon="times" /> {/* Usa el ícono aquí */}
                </button> 
            </div>
            <div className={styles.modalBody}>
                {children}
            </div>
        </Modal>
    );
}

export default ModalContainer;
