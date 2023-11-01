import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './ConfirmModal.module.css'; 

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} title="Confirmar eliminación">
            <p>¿Estás seguro de que deseas eliminar este ítem?</p>
            <button className={styles.confirmButton} onClick={onConfirm}>Confirmar</button>
            <button className={styles.cancelButton} onClick={onRequestClose}>Cancelar</button>
        </ModalContainer>
    );
}

export default ConfirmModal;
