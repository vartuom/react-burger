import React from 'react';
import modalOverlayStyles from "./modalOverlay.module.css"

const ModalOverlay = ({handleCloseAction}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={handleCloseAction}>
        </div>
    );
};

export default ModalOverlay;