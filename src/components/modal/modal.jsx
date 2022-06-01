import React from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from "../modalOverlay/modalOverlay";
import modalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals");

const Modal = ({children, handleCloseAction}) => {
    return ReactDOM.createPortal(
        <div className={modalStyles.root}>
            <div className={modalStyles.container}>
                <div className={`${modalStyles.modalHeader} pt-10 pl-10 pr-10`}>
                    <h2 className="text text_type_main-large">Детали ингридиента</h2>
                    <CloseIcon type="primary" onClick={handleCloseAction}/>
                </div>
                {children} {/* Вложенное в компонент содержимое */}
            </div>
            <ModalOverlay handleCloseAction={handleCloseAction} /> {/* Подложка */}
        </div>,
        modalRoot
    );
};

export default Modal;