import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import formStyles from "../../components/form/styles.module.css";

import {EMAIL_PATTERN, MIN_PASSWORD_LENGTH} from "../../services/auth/const";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {loginUserThunk} from "../../services/auth/thunks";
import Modal from "../../components/modal/modal";
import Tooltip from "../../components/tooltip/tooltip";
import {resetRequestStatus} from "../../services/auth/slices";

interface IFormInputs {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { loginRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IFormInputs>({mode: 'onBlur'});
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await dispatch(loginUserThunk(data)).unwrap();
    } catch (error: any) {
      setError('root', {message: error.message});
    }
  };
  const handleCloseTooltip = () => dispatch(resetRequestStatus('login'));

  let additionalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Пожалуйста, подождите" showLoading />
        </Modal>
      );
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text={errors.root?.message || 'Ошибка входа'} />
        </Modal>
      );
      break;
    case 'succeeded':
      // No need to handle this case. A user will be redirected to profile page as soon as login is successful
      break;
  }
  return (
    <main className={formStyles.content}>
      {additionalContent}
      <section className={formStyles.container}>
        <h1 className={`text text_type_main-medium ${formStyles.title} mb-6`}>Вход</h1>
        <form className={`${formStyles.form} mb-20`} onSubmit={handleSubmit(onSubmit)}>
          <input className={formStyles.form_field}
                 type="text"
                 placeholder="E-mail"
                 {...register("email", {
                   required: 'Введите email',
                   pattern: {value: EMAIL_PATTERN, message: 'Некорректный email'},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.email ? 'visible' : 'hidden'}}
          >{errors.email?.message}
          </span>
          <input className={formStyles.form_field}
                 type="password"
                 placeholder="Пароль"
                 {...register("password", {
                   required: 'Введите пароль',
                   minLength: {value: MIN_PASSWORD_LENGTH, message: 'Некорректный пароль'},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.password ? 'visible' : 'hidden'}}
          >{errors.password?.message}
          </span>
          <Button type="primary"
                  size="medium"
                  htmlType="submit"
          >Войти
          </Button>
        </form>
        <p className={`mb-4 ${formStyles.help_paragraph}`}>
          <span className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</span>
          <Link to='/register' className={formStyles.link}> Зарегистрироваться</Link>
        </p>
        <p className={`${formStyles.help_paragraph}`}>
          <span className='text text_type_main-small text_color_inactive'>Забыли пароль?</span>
          <Link to='/forgot-password' className={formStyles.link}> Восстановить пароль</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage;
