import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import formStyles from "../../components/form/styles.module.css";

import {MIN_PASSWORD_LENGTH} from "../../services/auth/const.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {resetPasswordThunk} from "../../services/auth/thunks.ts";
import Modal from "../../components/modal/modal.tsx";
import Tooltip from "../../components/tooltip/tooltip.tsx";
import {resetRequestStatus} from "../../services/auth/slices.ts";

interface IFormInputs {
  password: string;
  confirmationCode: string;
}

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const { resetPasswordRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IFormInputs>({mode: 'onBlur'});
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await dispatch(resetPasswordThunk(data)).unwrap();
    } catch (error: any) {
      setError('root', {message: error.message});
    }
  };
  const handleCloseTooltip = () => dispatch(resetRequestStatus('resetPassword'));

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
          <Tooltip text={errors.root?.message || 'Что-то пошло не так...'} />
        </Modal>
      );
      break;
    case 'succeeded':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Пароль успешно изменён" />
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
                 type="password"
                 placeholder="Введите новый пароль"
                 {...register("password", {
                   required: 'Введите пароль',
                   minLength: {
                     value: MIN_PASSWORD_LENGTH,
                     message: `Минимальная длина пароля - ${MIN_PASSWORD_LENGTH} символов`
                   },
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.password ? 'visible' : 'hidden'}}
          >{errors.password?.message}
          </span>
          <input className={formStyles.form_field}
                 type="text"
                 placeholder="Введите код из письма"
                 {...register("confirmationCode", {required: 'Введите код'})}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error} mb-3`}
                style={{visibility: errors.confirmationCode ? 'visible' : 'hidden'}}
          >{errors.confirmationCode?.message}
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

export default ResetPasswordPage;
