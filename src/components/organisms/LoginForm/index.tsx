import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import TextInputField from '@/components/molecules/TextInputField';
import Button from '@/components/atoms/Button';
import styles from './styles';

type LoginFormFields = 'email' | 'password';

interface Props {
   email: string;
   password: string;
   setField: (field: LoginFormFields, value: string) => void;
   onBlurEmail: () => void;
   onBlurPassword: () => void;
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
   onBlurEmail,
   onBlurPassword,
   onSubmit,
}: Props) {
   const { t } = useTranslation('auth');

   function hasSomeError() {
      if (!errors || Object.keys(errors).length <= 0) return true;

      return Boolean(errors.email) || Boolean(errors.password);
   }

   return (
      <View style={styles.form}>
         <TextInputField
            email
            label={t('labels.email')}
            value={email}
            onChangeText={(newEmail) => setField('email', newEmail)}
            onBlur={onBlurEmail}
            hasError={Boolean(errors.email)}
            error={errors.email}
         />
         <TextInputField
            password
            label={t('labels.password')}
            value={password}
            onChangeText={(newPassword) => setField('password', newPassword)}
            onBlur={onBlurPassword}
            hasError={Boolean(errors.password)}
            error={errors.password}
         />
         <Button
            label={t('buttons.sign.in')}
            onPress={onSubmit}
            style={styles.button}
            disabled={hasSomeError()}
         />
      </View>
   );
}
