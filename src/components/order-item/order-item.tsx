import React, {FC, useMemo} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

import styles from "./styles.module.css";

import {type IOrder} from "../../services/orders/types";
import {useAppLocation, useAppSelector} from "../../hooks";
import {
  extractOrderIngredients,
  localizeOrderStatus,
  localizeOrderTimeSince,
  orderStatusExtraClassMap
} from "../../services/orders/utils";

interface IOrderItemProps {
  order: IOrder;
  shouldDisplayStatus?: boolean;
}

const OrderItem: FC<IOrderItemProps> = ({order, shouldDisplayStatus = false}) => {
  const allIngredients = useAppSelector(state => state.ingredients.all)
  const location = useAppLocation();

  const ingredients = useMemo(() => extractOrderIngredients(order, allIngredients), [order, allIngredients])
  const price = useMemo(() => ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0), [ingredients])
  const timeSince = localizeOrderTimeSince(order.updatedAt);
  const status = localizeOrderStatus(order.status);
  const statusExtraClass = orderStatusExtraClassMap[order.status];

  return (
    <div className={styles.order}>
      <p className={`mb-6 ${styles.order_header}`}>
        <span className="text text_type_digits-default text_color_primary">#{order.number}</span>
        <span className="text text_type_main-small text_color_inactive">{timeSince}</span>
      </p>
      <Link to={`${location.pathname}/${order.number}`}
            state={{background: location}}
            className={shouldDisplayStatus ? "mb-2" : "mb-6"}
      >
        <motion.h2 className={"text text_type_main-medium text_color_primary"}
                   whileHover={{opacity: .6}}
                   transition={{duration: .3}}
        >
          {order.name}
        </motion.h2>
      </Link>
      {shouldDisplayStatus && (
        <p className={`mb-6 text text_type_main-default ${statusExtraClass}`}>{status}</p>
      )}
      <p className={`mb-6 ${styles.order_content}`}>
        <span className={styles.order_ingredients}>
          {ingredients.map((ingredient, index) => (
            <img className={styles.ingredient_icon}
                 src={ingredient.image_mobile}
                 alt={ingredient.name}
                 key={index}
                 style={{right: `${index * 16}px`, zIndex: ingredients.length - index}}
            />
          ))}
        </span>
        <span className={`text text_type_digits-default ${styles.order_price}`}>
          {price}<CurrencyIcon type="primary"/>
        </span>
      </p>
    </div>
  )
}

export default OrderItem;
