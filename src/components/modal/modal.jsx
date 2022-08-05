import React from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from "../modalOverlay/modalOverlay";
import modalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");

const Modal = ({children, title, onClose}) => {

    return ReactDOM.createPortal(
        <div className={modalStyles.root}>
            <div className={modalStyles.container}>
                <div className={`${modalStyles.modalHeader} pt-10 pl-10 pr-10`}>
                    <h2 className="text text_type_main-large">{title}</h2>
                    <div className={modalStyles.closeIcon}>
                    <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay handleCloseAction={onClose} />
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;