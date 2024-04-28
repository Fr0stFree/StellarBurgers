import React, {FC} from "react";
import {NavLink, type NavLinkProps} from "react-router-dom";

import styles from "./styles.module.css";
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

type HeaderLinkProps = {
  text: string;
  icon: FC<TIconProps>;
} & NavLinkProps;

const HeaderLink: FC<HeaderLinkProps> = ({text, icon: Icon, ...props}) => {
  return (
    <NavLink {...props} className={styles.link}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <span className="text text_type_main-small">{text}</span>
        </>
      )}
    </NavLink>
  );
}

export default HeaderLink;