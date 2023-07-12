import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '@/components/atoms/Button';
import Gap from '@/components/atoms/Gap';
import TextInputField from '@/components/molecules/TextInputField';
import styles from './styles';

type LoginFormFields = 'email' | 'password';

interface Props {
   email: string;
   password: string;
   setField: (field: LoginFormFields, value: string) => void;
   onBlur: (field: LoginFormFields) => void;
   errors: {
      email?: string;
      password?: string;
   };
   onSubmit: () => void;
}

export default function LoginForm({
   email,
   password,
   setField,
   errors,
   onBlur,
   onSubmit,
}: Props) {
   const { t } = useTranslation('auth');

   function hasSomeError() {
      if (!errors || Object.keys(errors).length >= 0) return true;

      return Boolean(errors.email) || Boolean(errors.password);
   }

   return (
      <KeyboardAwareScrollView>
         <Gap gap={8}>
            <TextInputField
               email
               label={t('labels.email')}
               value={email}
               onChangeText={(newEmail) => setField('email', newEmail)}
               onBlur={() => onBlur('email')}
               hasError={Boolean(errors.email)}
               error={errors.email}
            />
            <TextInputField
               password
               label={t('labels.password')}
               value={password}
               onChangeText={(newPassword) => setField('password', newPassword)}
               onBlur={() => onBlur('password')}
               hasError={Boolean(errors.password)}
               error={errors.password}
            />
            <Button
               label={t('buttons.sign.in')}
               onPress={onSubmit}
               style={styles.button}
               disabled={hasSomeError()}
            />
         </Gap>
      </KeyboardAwareScrollView>
   );
}
