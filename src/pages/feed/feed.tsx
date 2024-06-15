import React, {FC, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";

import styles from "./styles.module.css";


import OrdersStatistics from "./components/orders-statistics/orders-statistics.tsx";
import OrderHistory from "./components/orders-history/order-history.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {BACKEND_WS_BASE_URL} from "../../services/common/const.ts";
import {closePublicOrdersChannel, openPublicOrdersChannel} from "../../services/orders/slices.ts";


const FeedPage: FC = () => {
  const {publicOrdersChannelState: channelState, publicOrders: {orders}} = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const publicOrdersChannel = new URL(`${BACKEND_WS_BASE_URL}/orders/all`);
    dispatch(openPublicOrdersChannel(publicOrdersChannel.toString()));
    return () => void dispatch(closePublicOrdersChannel());
  }, [dispatch]);

  let content;
  if (["connecting", "open"].includes(channelState) && !orders.length) {
    content = (
      <div className={styles.loader}>
        <TailSpin color="#4169E1" height={120} width={120}/>
      </div>
    );
  } else {
    content = (
      <>
        <OrderHistory/>
        <OrdersStatistics/>
      </>
    );
  }
  return (
    <main className={`${styles.content} mt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <article className={styles.feed}>
        {content}
      </article>
    </main>
  )
}

export default FeedPage;
