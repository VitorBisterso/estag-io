import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useLogin from '@/hooks/useLogin';
import Button from '@/components/atoms/Button';
import Gap from '@/components/atoms/Gap';
import TextInputField from '@/components/molecules/TextInputField';
import styles from './styles';

export default function LoginForm() {
   const { t } = useTranslation('auth');

   const { formik, isLoading } = useLogin();
   const { email, password } = formik.values;
   const { errors } = formik;

   function shouldDisableButton() {
      if (!email || !password) return true;

      if (!errors || Object.keys(errors).length <= 0) return false;

      return Boolean(errors.email) || Boolean(errors.password);
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
            <Button
               label={t('buttons.sign.in')}
               onPress={formik.handleSubmit}
               style={styles.button}
               disabled={shouldDisableButton()}
               loading={isLoading}
            />
         </Gap>
      </KeyboardAwareScrollView>
   );
}
