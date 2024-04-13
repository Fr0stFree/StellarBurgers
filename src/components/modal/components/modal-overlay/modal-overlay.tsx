import React, {FC} from "react";

import styles from './styles.module.css';

type ModalOverlayProps = {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({children, onClick}) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  )
}

export default ModalOverlay;
