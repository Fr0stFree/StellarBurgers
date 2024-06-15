import React, {FC, useMemo, useCallback} from "react";
import {v4 as uuid4} from 'uuid';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

import styles from "./styles.module.css";

import {IOrder} from "../../services/orders/types.ts";
import {useAppLocation, useAppSelector} from "../../hooks.ts";
import {extractOrderIngredients, localizeOrderTimeSince} from "../../services/orders/utils.ts";

interface IOrderItemProps {
  order: IOrder;
}

const OrderItem: FC<IOrderItemProps> = ({order}) => {
  const allIngredients = useAppSelector(state => state.ingredients.all)
  const location = useAppLocation();

  const ingredients = useMemo(() => extractOrderIngredients(order, allIngredients), [order, allIngredients])
  const price = useMemo(() => ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0), [ingredients])
  const timeSince = localizeOrderTimeSince(order)

  return (
    <div className={styles.order}>
      <p className={styles.order_header}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-small text_color_inactive">{timeSince}</span>
      </p>
      <Link to={`${location.pathname}/${order.number}`} state={{background: location}}>
        <motion.h2 className="text text_type_main-medium text_color_primary"
                   whileHover={{opacity: .6}}
                   transition={{duration: .3}}
        >{order.name}
        </motion.h2>
      </Link>
      <p className={styles.order_content}>
        <span className={styles.order_ingredients}>
          {ingredients.map((ingredient, index) => (
            <img className={styles.ingredient_icon}
                 src={ingredient.image_mobile}
                 alt={ingredient.name}
                 key={uuid4()}
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
