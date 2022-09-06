import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from "../modalOverlay/modalOverlay";
import modalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect} from "react";

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IPropsModal {
    children: ReactNode,
    title?: string,
    onClose: () => void,
    isModalOpened: boolean
}

const Modal = (props: IPropsModal) => {
    const {children, title, onClose, isModalOpened} = props;
    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        if (isModalOpened) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isModalOpened, onClose])

    return ReactDOM.createPortal(
        <div className={modalStyles.root}>
            <div className={`${modalStyles.container} pt-3`}>
                <h2 className="text text_type_main-large pt-10 pl-10 pr-10">{title}</h2>
                <div className={modalStyles.closeIcon}>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
            <ModalOverlay handleCloseAction={onClose}/>
        </div>,
        modalRoot
    );
};


export default Modal;