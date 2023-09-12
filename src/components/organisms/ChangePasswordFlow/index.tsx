import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

import styles from './styles';
import ResetPasswordForm from '../ResetPasswordForm';
import ChangePasswordForm from '../ChangePasswordForm';

export default function ChangePasswordFlow() {
   const { t } = useTranslation('auth');
   const [resetFlow, setResetFlow] = useState(true);

   function renderForm() {
      if (resetFlow) return <ResetPasswordForm />;

      return <ChangePasswordForm />;
   }

   function renderMessage() {
      const message = resetFlow
         ? t('labels.already.have.token')
         : t('labels.dont.have.token');

      return (
         <Text
            style={styles.bottomMessage}
            onPress={() => setResetFlow((flow) => !flow)}
         >
            {message}
         </Text>
      );
   }

   return (
      <>
         {renderForm()}
         {renderMessage()}
      </>
   );
}
