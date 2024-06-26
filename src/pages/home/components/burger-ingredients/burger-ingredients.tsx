import React, {FC, useMemo} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {useInView} from "react-intersection-observer";
import {TailSpin} from "react-loader-spinner";

import styles from './styles.module.css';

import {hideIngredientsLoadingError} from "../../../../services/ingredients/slices";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {IngredientType} from "../../../../services/ingredients/const";
import {type IIngredient} from "../../../../services/ingredients/types";
import BurgerIngredientsPartition from "../burger-ingredients-partition/burger-ingredients-partition";
import Modal from "../../../../components/modal/modal";
import Tooltip from "../../../../components/tooltip/tooltip";

type TGroupedIngredients = {
  [IngredientType.BUN]: IIngredient[];
  [IngredientType.SAUCE]: IIngredient[];
  [IngredientType.MAIN]: IIngredient[];
}

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const {all: ingredients, getIngredientsRequestStatus: requestStatus} = useAppSelector(state => state.ingredients);
  const [currentTab, setCurrentTab] = React.useState<IngredientType>(IngredientType.BUN);

  const [bunsRef, , bunsEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.BUN)});
  const [saucesRef, , saucesEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.SAUCE)});
  const [mainsRef, , mainsEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.MAIN)});

  const filteredIngredients = useMemo(() => (
    ingredients.reduce((accumulator: TGroupedIngredients, ingredient: IIngredient) => {
      accumulator[ingredient.type].push(ingredient);
      return accumulator;
    }, {[IngredientType.MAIN]: [], [IngredientType.SAUCE]: [], [IngredientType.BUN]: []})
  ), [ingredients]);

  const handleTabClick = (tabName: IngredientType, entry?: IntersectionObserverEntry) => {
    setCurrentTab(tabName);
    entry?.target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };
  const handleCloseTooltip = () => dispatch(hideIngredientsLoadingError());

  let content = null;
  switch (requestStatus) {
    case 'failed':
      content = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Не удалось загрузить ингредиенты"/>
        </Modal>
      );
      break;
    case 'pending':
      content = (
        <div className={styles.loader}>
          <TailSpin color="#4169E1" height={100} width={100}/>
        </div>
      );
      break;
    case 'succeeded':
      content = (
        <>
          <div ref={bunsRef}>
            <BurgerIngredientsPartition title="Булки" ingredients={filteredIngredients[IngredientType.BUN]}/>
          </div>
          <div ref={saucesRef}>
            <BurgerIngredientsPartition title="Соусы" ingredients={filteredIngredients[IngredientType.SAUCE]}/>
          </div>
          <div ref={mainsRef}>
            <BurgerIngredientsPartition title="Начинки" ingredients={filteredIngredients[IngredientType.MAIN]}/>
          </div>
        </>
      );
      break;
    case 'idle':
      break;
  }
  return (
    <article className={`${styles.burger_ingredients} pt-10`}>
      <nav className="mb-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <ul className={styles.ingredients_tab}>
          <li>
            <Tab value={IngredientType.BUN}
                 active={currentTab === IngredientType.BUN}
                 onClick={() => handleTabClick(IngredientType.BUN, bunsEntry)}
            >Булки
            </Tab>
          </li>
          <li>
            <Tab value={IngredientType.SAUCE}
                 active={currentTab === IngredientType.SAUCE}
                 onClick={() => handleTabClick(IngredientType.SAUCE, saucesEntry)}
            >Соусы
            </Tab>
          </li>
          <li>
            <Tab value={IngredientType.MAIN}
                 active={currentTab === IngredientType.MAIN}
                 onClick={() => handleTabClick(IngredientType.MAIN, mainsEntry)}
            >Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <section className={styles.ingredients_list}>
        {content}
      </section>
    </article>
  );
}

export default BurgerIngredients;
