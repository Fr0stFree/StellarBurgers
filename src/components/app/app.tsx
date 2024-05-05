import React, {FC, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";

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
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks.ts";
import ProtectedRoute from "../../hocs/protected-route.tsx";
import {startSession} from "../../services/auth/thunks.ts";
import {resetRequestStatus} from "../../services/auth/slices.ts";
import Modal from "../modal/modal.tsx";
import Tooltip from "../tooltip/tooltip.tsx";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [ loginError, setLoginError ] = React.useState<string | null>(null);
  const { startSessionRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  useEffect(() => {
    try {
      dispatch(startSession()).unwrap();
    } catch (error: any) {
      setLoginError(error.message);
    }
  }, [dispatch]);

  const handleCloseTooltip = () => {
    dispatch(resetRequestStatus('startSession'));
    setLoginError(null);
  }

  let additionalContent;
  switch (requestStatus) {
    case 'idle' || 'succeeded':
      break;
    case 'pending':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text="Входим в систему" showLoading /></Modal>
      );
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text={loginError || 'Не удалось войти'} /></Modal>
      );
      break;
  }
  const location = useAppLocation();

  return (
    <>
      {additionalContent}
      <div className={`${styles.app} pt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes location={location.state?.background || location}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="login" element={
            <ProtectedRoute allowFor="anonymous">
              <LoginPage/>
            </ProtectedRoute>
          }/>
          <Route path="register" element={
            <ProtectedRoute allowFor="anonymous">
              <RegisterPage/>
            </ProtectedRoute>
          }/>
          <Route path="forgot-password" element={
            <ProtectedRoute allowFor="anonymous">
              <ForgotPasswordPage/>
            </ProtectedRoute>
          }/>
          <Route path="reset-password" element={
            <ProtectedRoute allowFor="anonymous">
              <ResetPasswordPage/>
            </ProtectedRoute>
          }/>
          <Route path="profile" element={
            <ProtectedRoute allowFor="authenticated">
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
    </>
  )
}

export default App;
