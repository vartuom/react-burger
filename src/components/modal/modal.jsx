import React from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from "../modalOverlay/modalOverlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("modals");

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className={modalStyles.root}>
            <div className={modalStyles.container}>
                <h2 className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингридиента</h2>
                {props.children} {/* Вложенное в компонент содержимое */}
            </div>
            <ModalOverlay onOverlayClick={props.onOverlayClick} /> {/* Подложка */}
        </div>,
        modalRoot
    );
};

export default Modal;