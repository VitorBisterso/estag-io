import * as Yup from 'yup';

import { TranslationFunctionType } from '@/utils';
import { isCnpjValid, phoneRegExp } from '@/validations';

const MIN_PASSWORD_SIZE = 8;

export function loginValidations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      email: Yup.string()
         .trim()
         .email(t('errors.invalid.email'))
         .required(requiredMessage),
      password: Yup.string()
         .trim()
         .min(MIN_PASSWORD_SIZE, t('errors.password.min'))
         .required(requiredMessage),
   });
}

export const PROFILE_TYPES = ['USER', 'COMPANY'];

export function signUpValidations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

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

export function resetPasswordValidations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      email: Yup.string()
         .trim()
         .email(t('errors.invalid.email'))
         .required(requiredMessage),
   });
}

export function changePasswordValidations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      token: Yup.string().trim().required(requiredMessage),
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
   });
}
