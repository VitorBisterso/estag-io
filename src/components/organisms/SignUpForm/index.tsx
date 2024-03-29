import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useSignUp, { SignUpValues } from '@/hooks/useSignUp';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import MaskedField from '@/components/atoms/MaskedField';
import Gap from '@/components/atoms/Gap';
import TextInputField from '@/components/molecules/TextInputField';
import DateField from '@/components/molecules/DateField';
import styles from './styles';

export default function SignUpForm() {
   const { t } = useTranslation('auth');

   const { formik, isLoading, categories } = useSignUp();
   const {
      name,
      email,
      password,
      confirmPassword,
      profile,
      birthday,
      cnpj,
      phone,
      businessCategory,
   } = formik.values;
   const { errors } = formik;

   function shouldDisableButton() {
      const commonFields: Array<keyof SignUpValues> = [
         'name',
         'email',
         'password',
         'confirmPassword',
      ];
      const userFields: Array<keyof SignUpValues> = ['birthday'];
      const companyFields: Array<keyof SignUpValues> = [
         'cnpj',
         'phone',
         'businessCategory',
      ];

      const profileFields = profile === 'USER' ? userFields : companyFields;
      const fieldsToCheck = [...commonFields, ...profileFields];

      const hasEmptyValue = Object.keys(formik.values).some(
         // @ts-expect-error string is different from keyof SignUpValues
         (key) => fieldsToCheck.includes(key) && !formik.values[key],
      );
      if (hasEmptyValue) return true;

      const hasError = Object.keys(formik.errors).some(
         // @ts-expect-error string is different from keyof SignUpValues
         (key) => fieldsToCheck.includes(key) && !!formik.errors[key],
      );
      if (hasError) return true;

      return false;
   }

   const profileOptions = [
      { label: t('labels.option.user'), value: 'USER' },
      { label: t('labels.option.company'), value: 'COMPANY' },
   ];
   function renderCommonFields() {
      return (
         <>
            <TextInputField
               label={t('labels.name')}
               value={name}
               placeholder="José da Silva"
               onChangeText={(newName) => formik.setFieldValue('name', newName)}
               onBlur={formik.handleBlur('name')}
               hasError={Boolean(errors.name) && formik.touched.name}
               error={errors.name}
            />
            <TextInputField
               inputMode="email"
               label={t('labels.email')}
               placeholder="user@email.com"
               value={email}
               onChangeText={(newEmail) =>
                  formik.setFieldValue('email', newEmail)
               }
               onBlur={formik.handleBlur('email')}
               hasError={Boolean(errors.email) && formik.touched.email}
               error={errors.email}
            />
            <TextInputField
               password
               label={t('labels.password')}
               value={password}
               placeholder="********"
               onChangeText={(newPassword) =>
                  formik.setFieldValue('password', newPassword)
               }
               onBlur={formik.handleBlur('password')}
               hasError={Boolean(errors.password) && formik.touched.password}
               error={errors.password}
            />
            <TextInputField
               password
               label={t('labels.confirm.password')}
               value={confirmPassword}
               placeholder="********"
               onChangeText={(newPassword) =>
                  formik.setFieldValue('confirmPassword', newPassword)
               }
               onBlur={formik.handleBlur('confirmPassword')}
               hasError={
                  Boolean(errors.confirmPassword) &&
                  formik.touched.confirmPassword
               }
               error={errors.confirmPassword}
            />
            <Select
               label={t('labels.select.profile')}
               value={profile}
               items={profileOptions}
               onValueChange={(newProfile) =>
                  formik.setFieldValue('profile', newProfile)
               }
            />
         </>
      );
   }

   function renderUniqueFields() {
      if (profile === 'USER') {
         return (
            <DateField
               label={t('labels.birthday')}
               date={birthday}
               onChange={(newDate) => formik.setFieldValue('birthday', newDate)}
               onBlur={formik.handleBlur('birthday')}
               hasError={Boolean(errors.birthday) && formik.touched.birthday}
               error={errors.birthday}
            />
         );
      }

      return (
         <Gap gap={12}>
            <MaskedField
               type="cnpj"
               label={t('labels.cnpj')}
               value={cnpj}
               onChange={(newValue) => formik.setFieldValue('cnpj', newValue)}
               onBlur={formik.handleBlur('cnpj')}
               hasError={Boolean(errors.cnpj) && formik.touched.cnpj}
               error={errors.cnpj}
            />
            <MaskedField
               type="phone"
               label={t('labels.phone')}
               value={phone}
               onChange={(newValue) => formik.setFieldValue('phone', newValue)}
               onBlur={formik.handleBlur('phone')}
               hasError={Boolean(errors.phone) && formik.touched.phone}
               error={errors.phone}
            />
            <Select
               label={t('labels.select.business.category')}
               value={businessCategory}
               items={categories}
               onValueChange={(newCategory) =>
                  formik.setFieldValue('businessCategory', newCategory)
               }
            />
         </Gap>
      );
   }

   return (
      <KeyboardAwareScrollView>
         <Gap gap={8}>
            {renderCommonFields()}
            {renderUniqueFields()}
            <Button
               label={t('buttons.sign.up')}
               onPress={formik.handleSubmit}
               style={styles.button}
               disabled={shouldDisableButton()}
               loading={isLoading}
            />
         </Gap>
      </KeyboardAwareScrollView>
   );
}
