import { FC } from 'react';
import BurgerIngredient from "../burger-ingredient";
import { type Ingredient } from "../../services/ingredients";

type BurgerIngredientsProps = {
  ingredient: Ingredient[];
}
const BurgerConstructor: FC = ({ ingredient }: BurgerIngredientsProps) => {
  return (
    <article>
      <ul>
        {ingredient.map((ingredient) => <li key={ingredient._id}><BurgerIngredient {...ingredient} /></li>)}
      </ul>
    </article>
  );
}

export default BurgerConstructor;
