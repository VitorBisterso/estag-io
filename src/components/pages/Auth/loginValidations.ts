import * as Yup from 'yup';

const MIN_PASSWORD_SIZE = 8;

export default (t: (key: string) => string) =>
   Yup.object({
      email: Yup.string()
         .trim()
         .email(t('errors.invalid.email'))
         .required(t('errors.required.field')),
      password: Yup.string()
         .trim()
         .min(MIN_PASSWORD_SIZE, t('errors.password.min'))
         .required(t('errors.required.field')),
   });
