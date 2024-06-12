import React, {FC, useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

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
import {useAppDispatch, useAppLocation} from "../../hooks.ts";
import ProtectedRoute from "../../hocs/protected-route.tsx";
import Modal from "../modal/modal.tsx";
import IngredientDetails from "../ingredient-details/ingredient-details.tsx";
import StartupLoginLoader from "../startup-login-loader/startup-login-loader.tsx";
import {getIngredientsThunk} from "../../services/ingredients/thunks.ts";
import {startSessionThunk} from "../../services/auth/thunks.ts";
import {
  openPublicOrdersChannel,
  closePublicOrdersChannel,
  openPrivateOrdersChannel,
  closePrivateOrdersChannel,
} from "../../services/orders/slices.ts";
import {BACKEND_WS_BASE_URL} from "../../services/common/const.ts";


const App: FC = () => {
  const location = useAppLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredientsThunk()), [dispatch]);
  useEffect(() => void dispatch(startSessionThunk()), [dispatch]);

  const background = location.state?.background;
  return (
    <>
      <StartupLoginLoader />
      <div className={`${styles.app} pt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage/>} />
          <Route path="ingredients/:id" element={<IngredientDetailsPage/>} />
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
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal onClose={() => navigate("/")}><IngredientDetails/></Modal>
            }/>
          </Routes>
        )}
      </div>
    </>
  )
}

export default App;
