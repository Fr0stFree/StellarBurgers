import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import formStyles from "../../components/form/styles.module.css";

import {EMAIL_PATTERN, MAX_NAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH} from "../../services/auth/const.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {registerUserThunk} from "../../services/auth/thunks.ts";
import Modal from "../../components/modal/modal.tsx";
import Tooltip from "../../components/tooltip/tooltip.tsx";
import {resetRequestStatus} from "../../services/auth/slices.ts";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const { registerRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInputs>({mode: 'onBlur'});
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await dispatch(registerUserThunk(data)).unwrap();
    } catch (error: any) {
      setError('root', {message: error.message});
    }
  };
  const handleCloseTooltip = () => dispatch(resetRequestStatus('register'));

  let additionalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text="Регистрируемся" showLoading /></Modal>
      );
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text={errors.root?.message || 'Ошибка регистрации'} /></Modal>
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
        <h1 className={`text text_type_main-medium ${formStyles.title} mb-6`}>Регистрация</h1>
        <form className={`${formStyles.form} mb-20`} onSubmit={handleSubmit(onSubmit)}>
          <input className={formStyles.form_field}
                 type="text"
                 placeholder="Имя"
                 {...register("name", {
                   required: 'Введите имя',
                   minLength: {value: MIN_NAME_LENGTH, message: `Минимальная длина имени - ${MIN_NAME_LENGTH} символов`},
                   maxLength: {value: MAX_NAME_LENGTH, message: `Максимальная длина имени - ${MAX_NAME_LENGTH} символов`},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.name ? 'visible' : 'hidden'}}
          >{errors.name?.message}
          </span>
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
                   minLength: {value: MIN_PASSWORD_LENGTH, message: `Минимальная длина пароля - ${MIN_PASSWORD_LENGTH} символов`},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.password ? 'visible' : 'hidden'}}
          >{errors.password?.message}
          </span>
          <Button type="primary"
                  size="medium"
                  htmlType="submit"
          >Зарегистрироваться
          </Button>
        </form>
        <p className={formStyles.help_paragraph}>
          <span className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</span>
          <Link to='/login' className={formStyles.link}> Войти</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage;
