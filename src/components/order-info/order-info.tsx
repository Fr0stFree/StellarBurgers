import React, {FC} from "react";

import styles from './styles.module.css';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks.ts";
import {TailSpin} from "react-loader-spinner";


const OrderInfo: FC = () => {
  const { orderNumber } = useParams();
  const orders = useAppSelector(state => state.orders.publicOrders.orders);
  const order = orders.find(order => order.number === Number(orderNumber));

  return (
    <section className={styles.container}>
      <p className="text text_type_digits-medium">#{order?.number}</p>
    </section>
  );
}

export default OrderInfo;
