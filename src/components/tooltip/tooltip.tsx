import React, {FC} from "react";
import {ThreeDots} from "react-loader-spinner";

import styles from './styles.module.css';

interface ITooltipProps {
  text?: string;
  showLoading?: boolean;
}

const Tooltip: FC<ITooltipProps> = ({text = 'Загрузка', showLoading = false}) => {
  return (
    <div className={`${styles.container} text text_type_main-medium`}>
      <span className={`${styles.text} mr-4`}>{text}</span>
      {showLoading && <ThreeDots color="var(--text-main)" height={50} width={50} />}
    </div>
  );
}

export default Tooltip;