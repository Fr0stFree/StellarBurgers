import {FC} from "react";

import styles from './styles.module.css';

import orderDoneImage from '../../images/order-done.svg';
import {type IPreOrder} from "../../services/orders/types.ts";

interface IOrderDetailsProps {
  preorder: IPreOrder;
}

const OrderDetails: FC<IOrderDetailsProps> = ({preorder}) => {
  return (
    <section className={styles.container}>
      <h1 className={`text text_type_digits-large mb-8 ${styles.order_number}`}>{preorder.order.number}</h1>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={orderDoneImage} alt="Заказ готов" className="mb-15"/>
      <p className="text text_type_main-default mb-2">Ваш заказ "{preorder.name}" начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </section>
  );
}

export default OrderDetails;
