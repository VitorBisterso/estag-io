import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useResetPassword from '@/hooks/useResetPassword';
import Button from '@/components/atoms/Button';
import Gap from '@/components/atoms/Gap';
import TextInputField from '@/components/molecules/TextInputField';

export default function ResetPasswordForm() {
   const { t } = useTranslation('auth');

   const { formik, isLoading } = useResetPassword();
   const { email } = formik.values;
   const { errors } = formik;

   function shouldDisableButton() {
      if (!email) return true;

      if (!errors || Object.keys(errors).length <= 0) return false;

      return Boolean(errors.email);
   }

   return (
      <KeyboardAwareScrollView>
         <Gap gap={8}>
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
