import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import styles from './styles.module.css';

import AppHeader from '../app-header/app-header.tsx';
import {
  HomePage,
  NotFoundPage,
  ProfilePage,
  ForgotPasswordPage,
  IngredientDetailsPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import {useAppDispatch} from "../../hooks";
import {getIngredients} from "../../services/ingredients/thunks.ts";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredients()), [dispatch]);

  return (
    <Router>
      <div className={`${styles.app} pt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
