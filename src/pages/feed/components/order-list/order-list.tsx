import {FC} from "react";

import styles from "./styles.module.css";

import {IOrder} from "../../../../services/orders/types";

interface IOrderListProps {
  title: Readonly<string>;
  orderExtraClass?: Readonly<string>;
  orders: IOrder[];
}

const OrderList: FC<IOrderListProps> = ({title, orderExtraClass, orders}) => {
  return (
    <div className={styles.order_list}>
      <p className="text text_type_main-medium mb-6">{title}</p>
      <ul>
        {orders.map(order => (
          <li key={order._id} className={`text text_type_digits-default ${orderExtraClass} mb-2`}>{order.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default OrderList;
