import React, {FC, useMemo} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {useInView} from "react-intersection-observer";

import BurgerIngredientsPartition from "./components/burger-ingredients-partition/burger-ingredients-partition.tsx";
import styles from './styles.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IngredientType} from "../../services/constants";
import {IIngredient} from "../../services/ingredients/types.ts";
import Modal from "../modal/modal.tsx";
import IngredientDetails from "../ingredient-details/ingredient-details.tsx";
import {hidePreviewedIngredient} from "../../services/ingredients/slices.ts";

type FilteredIngredients = {
  [IngredientType.BUN]: IIngredient[];
  [IngredientType.SAUCE]: IIngredient[];
  [IngredientType.MAIN]: IIngredient[];
}

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const {all: ingredients, previewed} = useAppSelector(state => ({
    all: state.ingredients.all,
    previewed: state.ingredients.previewed
  }));
  const [currentTab, setCurrentTab] = React.useState<IngredientType>(IngredientType.BUN);
  const [bunsRef, , bunsEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.BUN)});
  const [saucesRef, , saucesEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.SAUCE)});
  const [mainsRef, , mainsEntry] = useInView({onChange: (inView) => inView && setCurrentTab(IngredientType.MAIN)});

  const filteredIngredients = useMemo(() => (
    ingredients.reduce((accumulator: FilteredIngredients, ingredient: IIngredient) => {
      accumulator[ingredient.type].push(ingredient);
      return accumulator;
    }, {[IngredientType.MAIN]: [], [IngredientType.SAUCE]: [], [IngredientType.BUN]: []})
  ), [ingredients]);

  const handleTabClick = (tabName: IngredientType, entry: IntersectionObserverEntry) => {
    setCurrentTab(tabName);
    entry.target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };
  const handleCloseModal = () => dispatch(hidePreviewedIngredient());

  return (
    <>
      <article className={`${styles.content} pt-10`}>
        <section className="mb-10">
          <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
          <ul className={styles.ingredients_tab}>
            <li>
              <Tab value={IngredientType.BUN}
                   active={currentTab === IngredientType.BUN}
                   onClick={() => handleTabClick(IngredientType.BUN, bunsEntry!)}
              >Булки
              </Tab>
            </li>
            <li>
              <Tab value={IngredientType.SAUCE}
                   active={currentTab === IngredientType.SAUCE}
                   onClick={() => handleTabClick(IngredientType.SAUCE, saucesEntry!)}
              >Соусы
              </Tab>
            </li>
            <li>
              <Tab value={IngredientType.MAIN}
                   active={currentTab === IngredientType.MAIN}
                   onClick={() => handleTabClick(IngredientType.MAIN, mainsEntry!)}
              >Начинки
              </Tab>
            </li>
          </ul>
        </section>
        <div className={styles.ingredients}>
          <li ref={bunsRef}>
            <BurgerIngredientsPartition title="Булки" ingredients={filteredIngredients[IngredientType.BUN]}/>
          </li>
          <li ref={saucesRef}>
            <BurgerIngredientsPartition title="Соусы" ingredients={filteredIngredients[IngredientType.SAUCE]}/>
          </li>
          <li ref={mainsRef}>
            <BurgerIngredientsPartition title="Начинки" ingredients={filteredIngredients[IngredientType.MAIN]}/>
          </li>
        </div>
      </article>
      {previewed && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails ingredient={previewed}/>
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;