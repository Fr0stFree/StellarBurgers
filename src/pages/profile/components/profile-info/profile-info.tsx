import React, {FC} from "react";
import {Button, EditIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {SubmitHandler, useForm} from "react-hook-form";

import formStyles from "../../../../components/form/styles.module.css";
import styles from "./styles.module.css";

import {
  EMAIL_PATTERN,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../../../../services/auth/const.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {updateUser} from "../../../../services/auth/thunks.ts";
import {resetRequestStatus} from "../../../../services/auth/slices.ts";
import Modal from "../../../../components/modal/modal.tsx";
import Tooltip from "../../../../components/tooltip/tooltip.tsx";

type FormInputs = {
  name?: string;
  email?: string;
  password?: string;
}

const ProfileInfoPage: FC = () => {
  const { user, updateUserRequestStatus: requestStatus } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [ isNameInChangeMode, setNameChangeMode ] = React.useState<boolean>(false);
  const [ isLoginInChangeMode, setLoginChangeMode ] = React.useState<boolean>(false);
  const [ isPasswordInChangeMode, setPasswordChangeMode ] = React.useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormInputs>({mode: 'onChange'});

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await dispatch(updateUser(data)).unwrap()
    } catch (errorMessage: any) {
      setError('root', {message: errorMessage});
    } finally {
      [setNameChangeMode, setLoginChangeMode, setPasswordChangeMode].forEach(setter => setter(false));
    }
  }
  const handleReset = () => {
    [setNameChangeMode, setLoginChangeMode, setPasswordChangeMode].forEach(setter => setter(false));
    reset();
  }
  const handleCloseTooltip = () => dispatch(resetRequestStatus('updateUser'));

  let additionalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      additionalContent = <Modal onClose={handleCloseTooltip}><Tooltip text="Обновляем данные" showLoading /></Modal>;
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text={errors.root?.message || 'Не удалось обновить данные'} />
        </Modal>
      );
      break;
    case 'succeeded':
      additionalContent = <Modal onClose={handleCloseTooltip}><Tooltip text="Данные успешно обновлены" /></Modal>;
      break;
  }
  return (
    <section className={formStyles.container}>
      {additionalContent}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.form_field_wrapper} mb-3`}>
          {!isNameInChangeMode && (
            <>
              <button className={styles.field_change_button} type="button" onClick={() => setNameChangeMode(true)}>
                <EditIcon type="primary" />
              </button>
              <label className={`${styles.field_label} text text_type_main-small text_color_inactive`} htmlFor="name">
                Имя
              </label>
            </>
          )}
          <input className={formStyles.form_field}
                 type="text"
                 id="name"
                 defaultValue={user?.name}
                 style={{boxShadow: isNameInChangeMode ? '0 0 0 1px var(--text-main)' : 'none'}}
                 disabled={!isNameInChangeMode}
                 {...isNameInChangeMode && register("name", {
                   required: 'Введите новое имя',
                   minLength: {
                     value: MIN_NAME_LENGTH,
                     message: `Минимальная длина имени - ${MIN_NAME_LENGTH} символов`
                   },
                   maxLength: {
                     value: MAX_NAME_LENGTH,
                     message: `Максимальная длина имени - ${MAX_NAME_LENGTH} символов`
                   },
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error}`}
                style={{visibility: errors.name ? 'visible' : 'hidden'}}
          >{errors.name?.message}
        </span>
        </div>
        <div className={`${styles.form_field_wrapper} mb-3`}>
          {!isLoginInChangeMode && (
          <>
            <button className={styles.field_change_button} type="button" onClick={() => setLoginChangeMode(true)}>
              <EditIcon type="primary" />
            </button>
            <label className={`${styles.field_label} text text_type_main-small text_color_inactive`} htmlFor="email">
              Логин
            </label>
          </>
          )}
          <input className={formStyles.form_field}
                 type="text"
                 id="email"
                 defaultValue={user?.email}
                 disabled={!isLoginInChangeMode}
                 style={{boxShadow: isLoginInChangeMode ? '0 0 0 1px var(--text-main)' : 'none'}}
                 {...isLoginInChangeMode && register("email", {
                   pattern: {value: EMAIL_PATTERN, message: 'Некорректный логин'},
                   required: 'Введите новый логин',
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error}`}
                style={{visibility: errors.email ? 'visible' : 'hidden'}}
          >{errors.email?.message}
          </span>
        </div>
        <div className={`${styles.form_field_wrapper} mb-3`}>
          {!isPasswordInChangeMode && (
            <>
              <button className={styles.field_change_button} type="button" onClick={() => setPasswordChangeMode(true)}>
                <EditIcon type="primary" />
              </button>
              <label className={`${styles.field_label} text text_type_main-small text_color_inactive`} htmlFor="password">
                Пароль
              </label>
            </>
          )}
          <input className={formStyles.form_field}
                 type="password"
                 id="password"
                 placeholder='******'
                 style={{boxShadow: isPasswordInChangeMode ? '0 0 0 1px var(--text-main)' : 'none'}}
                 disabled={!isPasswordInChangeMode}
                 {...isPasswordInChangeMode && register("password", {
                   required: 'Введите новый пароль',
                   minLength: {
                     value: MIN_PASSWORD_LENGTH,
                     message: `Минимальная длина пароля - ${MIN_PASSWORD_LENGTH} символов`
                   },
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${formStyles.form_error}`}
                style={{visibility: errors.password ? 'visible' : 'hidden'}}
          >{errors.password?.message}
          </span>
          <div>
            <span className={`text text_type_main-small text_color_error ${formStyles.form_error}`}
                  style={{visibility: errors.root ? 'visible' : 'hidden'}}
            >{errors.root?.message}
            </span>
          </div>
        </div>
        {!!(isNameInChangeMode || isLoginInChangeMode || isPasswordInChangeMode) && (
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button type="primary"
                    size="medium"
                    htmlType="submit"
            >Подтвердить
            </Button>
            <Button type="secondary"
                    size="medium"
                    htmlType="reset"
                    onClick={handleReset}
            >Отменить
            </Button>
          </div>
        )}
      </form>
    </section>
)
}

export default ProfileInfoPage;
