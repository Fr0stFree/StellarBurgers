import React, {FC, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";

import styles from "./styles.module.css";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import OrderItem from "../../components/order-item/order-item.tsx";
import {BACKEND_WS_BASE_URL} from "../../services/common/const.ts";
import {closePrivateOrdersChannel, openPrivateOrdersChannel} from "../../services/orders/slices.ts";

const OrderHistoryPage: FC = () => {
  const {
    auth: {accessToken},
    orders: {privateOrders: orders, privateOrdersChannelState: channelState}
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) return;
    const privateOrderChannelUrl = new URL(`${BACKEND_WS_BASE_URL}/orders`);
    privateOrderChannelUrl.searchParams.set('token', accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken)
    dispatch(openPrivateOrdersChannel(privateOrderChannelUrl.toString()));
    return () => void dispatch(closePrivateOrdersChannel());
  }, [dispatch, accessToken]);

  let content;

  if (channelState === "open" && !orders.length) {
    content = (
      <p className={`text text_type_main-medium ${styles.loader}`}>У вас пока нет заказов</p>
    )
  } else if (channelState === "open" || (channelState === "connecting" && orders.length)) {
    content = (
      <ul className={styles.order_list}>
        {orders.map(order => (
          <li key={order._id}><OrderItem order={order} shouldDisplayStatus/></li>
        ))}
      </ul>
    )
  } else {
    content = (
      <div className={styles.loader}>
        <TailSpin color="#4169E1" height={120} width={120}/>
      </div>
    )
  }
  return (
    <section className={styles.order_history}>
      {content}
    </section>
  )
}

export default OrderHistoryPage;
