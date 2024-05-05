import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import formStyles from "../../components/form/styles.module.css";

import {EMAIL_PATTERN} from "../../services/auth/const.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {forgotPassword} from "../../services/auth/thunks.ts";
import Modal from "../../components/modal/modal.tsx";
import Tooltip from "../../components/tooltip/tooltip.tsx";
import {resetRequestStatus} from "../../services/auth/slices.ts";

type FormInputs = {
  email: string;
}

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const { forgotPasswordRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInputs>({mode: 'onBlur'});
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
    } catch (errorMessage: any) {
      setError('root', {message: errorMessage});
    }
  };
  const handleCloseTooltip = () => dispatch(resetRequestStatus('forgotPassword'));

  let additionalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text="Пожалуйста, подождите" showLoading /></Modal>
      );
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text={errors.root?.message || 'Что-то пошло не так...'} /></Modal>
      );
      break;
    case 'succeeded':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Код для восстановления пароля был отправлен на вашу почту" />
        </Modal>
      );
      break;
  }
  return (
    <main className={formStyles.content}>
      {additionalContent}
      <section className={formStyles.container}>
        <h1 className={`text text_type_main-medium ${formStyles.title} mb-6`}>Восстановление пароля</h1>
        <form className={`${formStyles.form} mb-20`} onSubmit={handleSubmit(onSubmit)}>
          <input className={formStyles.form_field}
                 type="text"
                 placeholder="Укажите e-mail"
                 {...register("email", {
                   required: 'Введите email',
                   pattern: {value: EMAIL_PATTERN, message: 'Некорректный email'},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.email ? 'visible' : 'hidden'}}
          >{errors.email?.message}
          </span>
          <Button type="primary"
                  size="medium"
                  htmlType="submit"
          >Восстановить
          </Button>
        </form>
        <p className={`mb-4 ${formStyles.help_paragraph}`}>
          <span className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</span>
          <Link to='/login' className={formStyles.link}> Войти</Link>
        </p>
      </section>
    </main>
  )
}

export default ForgotPasswordPage;
