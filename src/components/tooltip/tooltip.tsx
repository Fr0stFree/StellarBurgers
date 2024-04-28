import React, {FC} from "react";
import {ThreeDots} from "react-loader-spinner";

import styles from './styles.module.css';

type TooltipProps = {
  text?: string;
  showLoading?: boolean;
}

const Tooltip: FC<TooltipProps> = ({text = 'Загрузка', showLoading = false}) => {
  return (
    <div className={`pt-25 ${styles.content}`}>
      <p className={`${styles.text} pr-4 text text_type_main-medium`}>{text}</p>
      {showLoading && <ThreeDots color="#8585AD" height={50} width={50}/>}
    </div>
  );
}

export default Tooltip;