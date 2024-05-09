import React, {FC} from "react";
import {NavLink, type NavLinkProps} from "react-router-dom";

import styles from "./styles.module.css";
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface IHeaderLinkProps extends NavLinkProps {
  text: string;
  icon: FC<TIconProps>;
}

const HeaderLink: FC<IHeaderLinkProps> = ({text, icon: Icon, ...props}) => {
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