import React, {FC, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";

import styles from "./styles.module.css";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {NotFoundPage} from "../index.ts";
import OrderInfo from "../../components/order-info/order-info.tsx";
import {getOrderThunk} from "../../services/orders/thunks.ts";

const OrderInfoPage: FC = () => {
  const dispatch = useAppDispatch();
  const {order, getOrderRequestStatus: requestStatus} = useAppSelector(state => state.orders);
  const {orderNumber} = useParams();
  useEffect(() => {
    !order && dispatch(getOrderThunk(orderNumber));
  }, [dispatch, order, orderNumber]);

  let content;
  switch (requestStatus) {
    case 'idle' || 'failed':
      content = <NotFoundPage/>;
      break;
    case 'pending':
      content = (
        <div>
          <TailSpin color="#4169E1" height={150} width={150}/>
        </div>
      );
      break;
    case 'succeeded':
      content = <OrderInfo/>;
      break;
  }
  return (
    <main className={styles.content}>
      {content}
    </main>
  )
}

export default OrderInfoPage;
