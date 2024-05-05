import React, {FC} from "react";
import {ThreeDots} from "react-loader-spinner";

import styles from './styles.module.css';

type TooltipProps = {
  text?: string;
  showLoading?: boolean;
}

const Tooltip: FC<TooltipProps> = ({text = 'Загрузка', showLoading = false}) => {
  return (
    <div>
      <p className={`${styles.paragraph} text text_type_main-medium`}>
        <span className={`${styles.text} mr-4`}>{text}</span>
        {showLoading && <ThreeDots color="var(--text-main)" height={50} width={50} />}
      </p>
    </div>
  );
}

export default Tooltip;