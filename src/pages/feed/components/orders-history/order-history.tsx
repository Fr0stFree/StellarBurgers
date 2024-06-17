import {FC} from "react";

import styles from "./styles.module.css";

import {useAppSelector} from "../../../../hooks.ts";
import OrderItem from "../../../../components/order-item/order-item.tsx";

const OrderHistory: FC = () => {
  const orders = useAppSelector(state => state.orders.publicOrders);
  return (
    <section className={styles.order_history}>
      <ul className={styles.order_list}>
        {orders.map(order => (
          <li key={order._id}>
            <OrderItem order={order}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrderHistory;
