import {FC} from "react";

import underConstructionImage from '../../images/under-construction.png';

const OrdersHistoryPage: FC = () => {
  return (
    <section>
      <img src={underConstructionImage}
           alt="Страница в разработке"
           style={{margin: '0 auto', display: 'block'}}
      />
      <p className="text text_type_main-large mt-10" style={{textAlign: 'center'}}>
        Страница в разработке
      </p>
    </section>
  )
}

export default OrdersHistoryPage;
