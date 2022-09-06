import React from 'react';
import modalOverlayStyles from "./modalOverlay.module.css"
import PropTypes from "prop-types";

const ModalOverlay = ({handleCloseAction}: {handleCloseAction: () => void}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={handleCloseAction}>
        </div>
    );
};

ModalOverlay.propTypes = {
    handleCloseAction: PropTypes.func.isRequired,
};

export default ModalOverlay;