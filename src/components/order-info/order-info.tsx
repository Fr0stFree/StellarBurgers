import React, {FC} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";

import styles from './styles.module.css';

import {useAppLocation, useAppSelector} from "../../hooks";
import {extractOrderIngredients, localizeOrderStatus, localizeOrderTimeSince} from "../../services/orders/utils";


const OrderInfo: FC = () => {
  const {orderNumber} = useParams();
  const location = useAppLocation();

  let lookup: "publicOrders" | "privateOrders";
  location.pathname.startsWith('/profile/orders') ? lookup = "privateOrders" : lookup = "publicOrders";

  const orders = useAppSelector(state => state.orders[lookup]);
  const allIngredients = useAppSelector(state => state.ingredients.all);
  const order = orders.find(order => order.number === Number(orderNumber));

  if (!order) {
    return (
      <section className={styles.container}>
        <p className={`text text_type_main-medium ${styles.order_not_found}`}>
          Заказ <span className="text text_type_digits-medium"> #{orderNumber} </span> не найден
        </p>
      </section>
    );
  }

  const ingredients = extractOrderIngredients(order, allIngredients)
  const timeSince = localizeOrderTimeSince(order.updatedAt)
  const status = localizeOrderStatus(order.status)
  const price = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
  const groupedIngredients = Object.groupBy(ingredients, ingredient => ingredient._id)

  return (
    <section className={`${styles.container} pt-10 pb-10`}>
      <p className={`text text_type_digits-default mb-10 ${styles.order_number}`}>#{order.number}</p>
      <h1 className="text text_type_main-medium mb-3">{order.name}</h1>
      <p className="text text_type_main-small text_color_success mb-15">{status}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`mb-10 ${styles.ingredients_list}`}>
        {Array.from(new Set(ingredients)).map(ingredient => (
          <li key={ingredient._id}>
            <div className={styles.ingredient}>
              <div className={styles.ingredient_info}>
                <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.ingredient_icon}/>
                <span className="text text_type_main-default">{ingredient.name}</span>
              </div>
              <div className={styles.ingredient_price}>
                <span className="text text_type_digits-default">
                  {groupedIngredients[ingredient._id]!.length} x {ingredient.price}
                </span>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.order_footer}>
        <span className="text text_type_main-small text_color_inactive">{timeSince}</span>
        <span className={`text text_type_digits-default ${styles.ingredient_price}`}>
          {price}<CurrencyIcon type="primary"/>
        </span>
      </p>
    </section>
  );
}

export default OrderInfo;
