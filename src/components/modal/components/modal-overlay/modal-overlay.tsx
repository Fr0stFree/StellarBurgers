import React, {FC} from "react";
import {motion} from "framer-motion";

import styles from './styles.module.css';


type ModalOverlayProps = {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({children, onClick}) => {
  return (
    <motion.div className={styles.overlay}
                onClick={onClick}
                initial={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                animate={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
                exit={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                transition={{duration: 0.3}}
    >
      {children}
    </motion.div>
  )
}

export default ModalOverlay;
