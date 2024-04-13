import React, {FC, useEffect} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";
import ModalOverlay from "./components/modal-overlay/modal-overlay";

import styles from './styles.module.css';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({children, onClose}) => {
  useEffect(() => {
    const closeModalByEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          <CloseIcon type="primary"/>
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root')!,
  );
}

export default Modal;
