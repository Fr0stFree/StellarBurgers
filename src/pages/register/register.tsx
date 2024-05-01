import React, {FC} from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import styles from "./styles.module.css";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {EMAIL_PATTERN, MAX_NAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH} from "../../services/constants.ts";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({mode: 'onBlur'});
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('data', data);
  }

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        <h1 className={`text text_type_main-medium ${styles.title} mb-6`}>Регистрация</h1>
        <form className={styles.registration_form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.form_field}
                 type="text"
                 placeholder="Имя"
                 {...register("name", {
                   required: 'Введите имя',
                   minLength: {value: MIN_NAME_LENGTH, message: `Минимальная длина имени - ${MIN_NAME_LENGTH} символов`},
                   maxLength: {value: MAX_NAME_LENGTH, message: `Максимальная длина имени - ${MAX_NAME_LENGTH} символов`},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${styles.form_error} mb-3`}
                style={{visibility: errors.name ? 'visible' : 'hidden'}}
          >{errors.name?.message}
          </span>
          <input className={styles.form_field}
                 type="text"
                 placeholder="E-mail"
                 {...register("email", {
                   required: 'Введите email',
                   pattern: {value: EMAIL_PATTERN, message: 'Некорректный email'},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${styles.form_error} mb-3`}
                style={{visibility: errors.email ? 'visible' : 'hidden'}}
          >{errors.email?.message}
          </span>
          <input className={styles.form_field}
                 type="password"
                 placeholder="Пароль"
                 {...register("password", {
                   required: 'Введите пароль',
                   minLength: {value: MIN_PASSWORD_LENGTH, message: `Минимальная длина пароля - ${MIN_PASSWORD_LENGTH} символов`},
                 })}
          />
          <span className={`text text_type_main-small text_color_error ${styles.form_error} mb-3`}
                style={{visibility: errors.password ? 'visible' : 'hidden'}}
          >{errors.password?.message}
          </span>
          <Button type="primary"
                  size="medium"
                  htmlType="submit"
          >Зарегистрироваться
          </Button>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage;
