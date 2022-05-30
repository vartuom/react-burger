import React from 'react';
import modalOverlayStyles from "./modalOverlay.module.css"

const ModalOverlay = ({onOverlayClick}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onOverlayClick}>
        </div>
    );
};

export default ModalOverlay;