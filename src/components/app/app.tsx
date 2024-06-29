import React, {FC, useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import styles from './styles.module.css';

import AppHeader from './components/app-header/app-header';
import {
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  OrderHistoryPage,
  OrderInfoPage,
  ProfileInfoPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import {useAppDispatch, useAppLocation} from "../../hooks";
import ProtectedRoute from "../../hocs/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import StartupLoginLoader from "../startup-login-loader/startup-login-loader";
import OrderInfo from "../order-info/order-info";
import {reviewUserThunk} from "../../services/auth/thunks";
import {getIngredientsThunk} from "../../services/ingredients/thunks";

const App: FC = () => {
  const location = useAppLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(reviewUserThunk()), [dispatch]);
  useEffect(() => void dispatch(getIngredientsThunk()), [dispatch]);

  const background = location.state?.background;
  return (
    <>
      <StartupLoginLoader/>
      <div className={`${styles.app} pt-10 mr-10 ml-10`}>
        <AppHeader/>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="feed" element={<FeedPage/>}/>
          <Route path="feed/:orderNumber" element={<OrderInfoPage/>}/>
          <Route path="ingredients/:id" element={<IngredientDetailsPage/>}/>
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
            <Route index element={<ProfileInfoPage/>}/>
            <Route path="orders" element={<OrderHistoryPage/>}/>
          </Route>
          <Route path="profile/orders/:orderNumber" element={
            <ProtectedRoute allowFor="authenticated">
              <OrderInfoPage/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal onClose={() => navigate("/")}>
                <IngredientDetails/>
              </Modal>
            }/>
            <Route path="/feed/:orderNumber" element={
              <Modal onClose={() => navigate("/feed")}>
                <OrderInfo/>
              </Modal>
            }/>
            <Route path="/profile/orders/:orderNumber" element={
              <Modal onClose={() => navigate("/profile/orders")}>
                <OrderInfo/>
              </Modal>
            }/>
          </Routes>
        )}
      </div>
    </>
  )
}

export default App;
