import React, {FC} from "react";
import {ThreeDots} from "react-loader-spinner";

import Modal from "../modal/modal.tsx";
import styles from './styles.module.css';

type TooltipProps = {
  text?: string;
  onClose: () => void;
  showLoading?: boolean;
}

const Tooltip: FC<TooltipProps> = ({text = 'Загрузка', onClose, showLoading = false}) => {
  return (
    <Modal onClose={onClose}>
      <div className={`pt-25 ${styles.content}`}>
        <p className={`${styles.text} pr-4 text text_type_main-medium`}>{text}</p>
        {showLoading && <ThreeDots color="#8585AD" height={50} width={50}/>}
      </div>
    </Modal>
  );
}

export default Tooltip;