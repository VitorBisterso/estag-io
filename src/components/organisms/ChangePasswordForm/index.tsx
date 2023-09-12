import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useChangePassword from '@/hooks/useChangePassword';
import Button from '@/components/atoms/Button';
import Gap from '@/components/atoms/Gap';
import TextInputField from '@/components/molecules/TextInputField';

export default function ChangePasswordForm() {
   const { t } = useTranslation('auth');

   const { formik, isLoading } = useChangePassword();
   const { token, email, password, confirmPassword } = formik.values;
   const { errors } = formik;

   function shouldDisableButton() {
      const hasEmptyValue = Object.keys(formik.values).some(
         (key) =>
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === '' ||
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === null ||
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === undefined,
      );
      if (hasEmptyValue) return true;

      const hasError = Object.keys(errors).some(
         // @ts-expect-error string is different from keyof OpportunityFormValues
         (key) => !!errors[key],
      );
      if (hasError) return true;

      return false;
   }

   return (
      <KeyboardAwareScrollView>
         <Gap gap={8}>
            <TextInputField
               password
               label={t('labels.token')}
               placeholder="******"
               value={token}
               onChangeText={(newToken) =>
                  formik.setFieldValue('token', newToken)
               }
               onBlur={formik.handleBlur('token')}
               hasError={Boolean(errors.token) && formik.touched.token}
               error={errors.token}
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
               label={t('labels.new.password')}
               placeholder="******"
               value={password}
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
               placeholder="******"
               value={confirmPassword}
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
            <Button
               label={t('buttons.reset.password')}
               onPress={formik.handleSubmit}
               disabled={shouldDisableButton()}
               loading={isLoading}
            />
         </Gap>
      </KeyboardAwareScrollView>
   );
}
