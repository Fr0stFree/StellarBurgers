import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css';

type BurgerIngredientProps = {
  image: string;
  name: string;
  price: number;
};

const BurgerIngredient: FC = ({ image, name, price }: BurgerIngredientProps) => {
  return (
    <>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.price}>
        <span>{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name}>{name}</p>
    </>
  );

}

export default BurgerIngredient;