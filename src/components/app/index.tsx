import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import BurgerIngredientDetail from "../burger-ingredient-detail";
import OrderDetail from "../order-detail";
import Modal from '../modal';
import styles from './styles.module.css';
import {type IIngredient, loadIngredients} from "../../services/ingredients";
import {type IModalState, type IMemoizedIngredients } from "./types";


const App: FC = () => {
  // modal
  const [modalState, setModalState] = useState<IModalState>({ isOpen: false, children: null });
  const openModal = useCallback((children: ReactNode) => setModalState({ isOpen: true, children }), []);
  const closeModal = useCallback(() => setModalState({ isOpen: false, children: null }), []);
  const closeModalByEscape = (event: KeyboardEvent) => event.key === 'Escape' && closeModal();
  const openIngredientDetail = (ingredient: IIngredient) => openModal(<BurgerIngredientDetail ingredient={ingredient} />);
  const openOrderDetail = () => openModal(<OrderDetail orderId={Math.floor(Math.random() * 1000000)} />);
  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  }, [closeModalByEscape]);

  // ingredients
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  useEffect<() => void>(() => {
    const load = async () => {
      try {
        setIngredients(await loadIngredients());
      } catch (error) {
        console.error(error);
        openModal(<p className={`text text_type_main-large ${styles.error_container}`}>Упс, ингредиенты не найдены</p>);
      }
    };
    load();
  }, []);
  const { buns, sauces, mains } = useMemo<IMemoizedIngredients>(() => ingredients.reduce((accumulator, ingredient) => {
      const mapping = {main: "mains", sauce: "sauces", bun: "buns"}
      accumulator[mapping[ingredient.type]].push(ingredient);
      return accumulator;
    }, { buns: [], sauces: [], mains: [] }
  ), [ingredients]);

  return (
    <>
      <div className={`${styles.content} mt-10 mr-10 ml-10`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients buns={buns} sauces={sauces} mains={mains} onIngredientClick={openIngredientDetail} />
          <BurgerConstructor mains={mains} onIngredientClick={openIngredientDetail} onPlaceOrderClick={openOrderDetail} />
        </main>
      </div>
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.children}
      </Modal>
    </>
  );
}

export default App;
