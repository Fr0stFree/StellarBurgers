import React, { FC, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from "react-intersection-observer";

import BurgerIngredientsPartition from "./components/burger-ingredients-partition";
import styles from './styles.module.css';
import { useAppSelector } from "../../hooks";
import { IngredientType } from "../../services/constants";
import { IIngredient } from "../../services/ingredients/types";

type FilteredIngredients = {
  [IngredientType.BUN]: IIngredient[];
  [IngredientType.SAUCE]: IIngredient[];
  [IngredientType.MAIN]: IIngredient[];
}

const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector(state => state.ingredients.all);
  const [currentTab, setCurrentTab] = React.useState<IngredientType>(IngredientType.BUN);
  const [bunsRef, , bunsEntry ] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.BUN) });
  const [saucesRef, , saucesEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.SAUCE) });
  const [mainsRef, , mainsEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.MAIN) });

  const filteredIngredients = useMemo(() => (
    ingredients.reduce((accumulator: FilteredIngredients, ingredient: IIngredient) => {
      accumulator[ingredient.type].push(ingredient);
      return accumulator;
    }, { [IngredientType.MAIN]: [], [IngredientType.SAUCE]: [], [IngredientType.BUN]: [] })
  ), [ingredients]);

  const handleTabClick = (tabName: IngredientType, entry: IntersectionObserverEntry) => {
    setCurrentTab(tabName);
    entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <article className={`${styles.article} pt-10`}>
      <section className="mb-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <ul className={styles.ingredients_tab}>
          <li><Tab value={IngredientType.BUN} active={currentTab === IngredientType.BUN} onClick={() => handleTabClick(IngredientType.BUN, bunsEntry!)}>Булки</Tab></li>
          <li><Tab value={IngredientType.SAUCE} active={currentTab === IngredientType.SAUCE} onClick={() => handleTabClick(IngredientType.SAUCE, saucesEntry!)}>Соусы</Tab></li>
          <li><Tab value={IngredientType.MAIN} active={currentTab === IngredientType.MAIN} onClick={() => handleTabClick(IngredientType.MAIN, mainsEntry!)}>Начинки</Tab></li>
        </ul>
      </section>
      <div className={styles.ingredients}>
        <li ref={bunsRef}><BurgerIngredientsPartition title="Булки" ingredients={filteredIngredients[IngredientType.BUN]}/></li>
        <li ref={saucesRef}><BurgerIngredientsPartition title="Соусы" ingredients={filteredIngredients[IngredientType.SAUCE]}/></li>
        <li ref={mainsRef}><BurgerIngredientsPartition title="Начинки" ingredients={filteredIngredients[IngredientType.MAIN]}/></li>
      </div>
    </article>
  );
}

export default BurgerIngredients;
