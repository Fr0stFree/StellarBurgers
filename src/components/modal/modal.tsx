import React, {FC, useEffect} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";

import styles from './styles.module.css';

import ModalOverlay from "./components/modal-overlay/modal-overlay";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({children, onClose}) => {
  useEffect(() => {
    const closeModalByEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <motion.div className={`${styles.modal} pr-4 pl-4 pb-6`}
                  onClick={e => e.stopPropagation()}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.3, ease: 'easeOut'}}
      >
        <motion.button className={styles.close_button} onClick={onClose} whileHover={{opacity: .7}}>
          <CloseIcon type="primary"/>
        </motion.button>
        {children}
      </motion.div>
    </ModalOverlay>,
    document.getElementById('modal-root')!,
  );
}

export default Modal;
