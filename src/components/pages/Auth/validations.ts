import { isCnpjValid, phoneRegExp } from '@/validations';
import * as Yup from 'yup';

const MIN_PASSWORD_SIZE = 8;

export function loginValidations(t: (key: string) => string) {
   return Yup.object({
      email: Yup.string()
         .trim()
         .email(t('errors.invalid.email'))
         .required(t('errors.required.field')),
      password: Yup.string()
         .trim()
         .min(MIN_PASSWORD_SIZE, t('errors.password.min'))
         .required(t('errors.required.field')),
   });
}

export const PROFILE_TYPES = ['USER', 'COMPANY'];

export function signUpValidations(t: (key: string) => string) {
   const requiredMessage = t('errors.required.field');
   return Yup.object({
      name: Yup.string().trim().required(requiredMessage),
      email: Yup.string()
         .trim()
         .email(t('errors.invalid.email'))
         .required(requiredMessage),
      password: Yup.string()
         .trim()
         .min(MIN_PASSWORD_SIZE, t('errors.password.min'))
         .required(requiredMessage),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password'), null as any], t('errors.equal.passwords'))
         .required(requiredMessage),
      profile: Yup.string().oneOf(PROFILE_TYPES).required(requiredMessage),
      birthday: Yup.date().max(new Date(), t('errors.invalid.date')),
      cnpj: Yup.string()
         .trim()
         .test('Is CNPJ valid', t('errors.invalid.cnpj'), isCnpjValid),
      phone: Yup.string()
         .trim()
         .matches(phoneRegExp, t('errors.invalid.phone')),
   });
}
