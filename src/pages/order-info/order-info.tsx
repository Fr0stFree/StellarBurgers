import React, {FC, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";

import styles from "./styles.module.css";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {NotFoundPage} from "../index";
import OrderInfo from "../../components/order-info/order-info";
import {getOrderThunk} from "../../services/orders/thunks";

const OrderInfoPage: FC = () => {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(state => state.orders.getOrderRequestStatus);
  const {orderNumber} = useParams();
  useEffect(() => {
    const promise = dispatch(getOrderThunk(Number(orderNumber)));
    return () => promise.abort();
  }, [dispatch, orderNumber]);

  let content;
  switch (requestStatus) {
    case 'failed':
      content = <NotFoundPage/>;
      break;
    case 'idle' || 'pending':
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
