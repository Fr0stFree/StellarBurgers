import React, {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header.tsx';
import styles from './styles.module.css';
import {useAppDispatch} from "../../hooks";
import {getIngredients} from "../../services/ingredients/thunks.ts";
import {Outlet} from "react-router-dom";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredients()), [dispatch]);

  return (
    <div className={`${styles.content} mt-10 mr-10 ml-10`}>
      <AppHeader/>
      <Outlet />
    </div>
  )
}

export default App;
