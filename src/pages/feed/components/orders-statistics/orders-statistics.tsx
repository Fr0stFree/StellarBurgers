import React, {FC} from "react";

import styles from "./styles.module.css";

import {useAppSelector} from "../../../../hooks.ts";
import OrderList from "../order-list/order-list.tsx";

const OrdersStatistics: FC = () => {
  const {orders, total, totalToday} = useAppSelector(state => state.orders.publicOrders);
  const groupedOrders = Object.groupBy(orders, order => order.status)

  return (
    <section className={styles.orders_statistics}>
      <div className={styles.orders_groups}>
        <OrderList title="Готовы:" orderExtraClass="text_color_success" orders={groupedOrders.done || []}/>
        <OrderList title="В работе:" orders={groupedOrders.pending || []}/>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.orders_amount} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.orders_amount} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  )
}

export default OrdersStatistics;
