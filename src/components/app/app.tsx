import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import styles from './styles.module.css';
import AppHeader from '../app-header/app-header.tsx';
import {BurgersMenuPage, NotFoundPage} from '../../pages';
import {useAppDispatch} from "../../hooks";
import {getIngredients} from "../../services/ingredients/thunks.ts";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredients()), [dispatch]);

  return (
    <Router>
      <div className={`${styles.app} mt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<BurgersMenuPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
