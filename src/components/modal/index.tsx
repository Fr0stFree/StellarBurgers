import {FC, ReactNode } from 'react';
import { createPortal } from "react-dom";

import styles from './styles.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot: HTMLElement = document.getElementById('modal-root');

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>
  )
  return createPortal(isOpen && content, modalRoot);
}

export default Modal;
