import React, {FC, useEffect} from 'react';
import {RotatingLines} from "react-loader-spinner";
import {AnimatePresence, motion} from "framer-motion";
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
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks.ts";
import ProtectedRoute from "../../hocs/protected-route.tsx";
import {startSession} from "../../services/auth/thunks.ts";
import Modal from "../modal/modal.tsx";
import IngredientDetails from "../ingredient-details/ingredient-details.tsx";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const navigate = useNavigate();
  const { startSessionRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  useEffect(() => {
    try {
      dispatch(startSession()).unwrap();
    } catch (error: any) {
      console.error(error.message);
    }
  }, [dispatch]);

  let additionalContent;
  switch (requestStatus) {
    case 'idle' || 'succeeded' || 'failed':
      break;
    case 'pending':
      additionalContent = (
        <motion.div className={styles.session_loader} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: .8}}>
          <span className="text text_color_inactive text_type_main-small mr-2">Входим в систему</span>
          <RotatingLines strokeColor="#8585AD" width="15" />
        </motion.div>
      );
      break;
  }
  const background = location.state?.background;
  return (
    <>
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
            <ProtectedRoute allowFor="anonymous">
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
      <AnimatePresence initial={false}>
        {additionalContent}
      </AnimatePresence>
    </>
  )
}

export default App;
