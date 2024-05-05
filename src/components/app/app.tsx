import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import styles from './styles.module.css';

import AppHeader from './components/app-header/app-header.tsx';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  OrdersHistoryPage,
  ProfileInfoPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import ProtectedRoute from "../../hocs/protected-route.tsx";
import {startSession} from "../../services/auth/thunks.ts";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(state => state.auth.user !== null);
  useEffect(() => void dispatch(startSession()), []);

  return (
    <Router>
      <div className={`${styles.app} pt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="login" element={
            <ProtectedRoute redirectTo="/profile" predicate={() => !isAuthorized}>
              <LoginPage/>
            </ProtectedRoute>
          }/>
          <Route path="register" element={
            <ProtectedRoute redirectTo="/profile" predicate={() => !isAuthorized}>
              <RegisterPage/>
            </ProtectedRoute>
          }/>
          <Route path="forgot-password" element={
            <ProtectedRoute redirectTo="/profile" predicate={() => !isAuthorized}>
              <ForgotPasswordPage/>
            </ProtectedRoute>
          }/>
          <Route path="reset-password" element={
            <ProtectedRoute redirectTo="/profile" predicate={() => !isAuthorized}>
              <ResetPasswordPage/>
            </ProtectedRoute>
          }/>
          <Route path="profile" element={
            <ProtectedRoute redirectTo="/login" predicate={() => isAuthorized}>
              <ProfilePage/>
            </ProtectedRoute>
          }>
            <Route index element={<ProfileInfoPage />}/>
            <Route path="orders" element={<OrdersHistoryPage />}/>
          </Route>
          <Route path="ingredients/:id" element={<IngredientDetailsPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
