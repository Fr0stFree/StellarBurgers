import React, {FC} from "react";
import {RotatingLines} from "react-loader-spinner";
import {AnimatePresence, motion} from "framer-motion";

import styles from "./styles.module.css";

import {useAppSelector} from "../../hooks";

const StartupLoginLoader: FC = () => {
  const {startSessionRequestStatus: requestStatus} = useAppSelector(state => state.auth);

  let content;
  switch (requestStatus) {
    case 'idle' || 'succeeded' || 'failed':
      // TODO: probably I should handle 'success' and 'failure' cases here. One day.
      break;
    case 'pending':
      content = (
        <motion.div className={styles.loader} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: .8}}>
          <span className="text text_color_inactive text_type_main-small mr-2">Входим в систему</span>
          <RotatingLines strokeColor="#8585AD" width="15"/>
        </motion.div>
      );
      break;
  }
  return (
    <AnimatePresence initial={false}>
      {content}
    </AnimatePresence>
  );
}

export default StartupLoginLoader;
