import React from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from "../modalOverlay/modalOverlay";
import modalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals");

const Modal = ({children, handleCloseAction}) => {

    React.useEffect(() => {
        document.addEventListener('keydown', handleCloseAction);

        //снятие слушателя при размонтировании компонента
        return () => {
            // console.log("Я удалился"); //TODO for debug
            document.removeEventListener('keydown', handleCloseAction);
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={modalStyles.root}>
            <div className={modalStyles.container}>
                <div className={`${modalStyles.modalHeader} pt-10 pl-10 pr-10`}>
                    <h2 className="text text_type_main-large">Детали ингридиента</h2>
                    <CloseIcon type="primary" onClick={handleCloseAction}/>
                </div>
                {children}
            </div>
            <ModalOverlay handleCloseAction={handleCloseAction} />
        </div>,
        modalRoot
    );
};

export default Modal;