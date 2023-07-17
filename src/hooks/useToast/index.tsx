import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

export default function useToast() {
   const { t } = useTranslation('toast');

   const defaultTimeout = 4000;
   return {
      success: (message: string, timeout = defaultTimeout) =>
         Toast.show({
            type: 'success',
            text1: t('title.success'),
            text2: message,
            visibilityTime: timeout,
         }),
      error: (message: string, timeout = defaultTimeout) =>
         Toast.show({
            type: 'error',
            text1: t('title.error'),
            text2: message,
            visibilityTime: timeout,
         }),
      info: (message: string, timeout = defaultTimeout) =>
         Toast.show({
            type: 'info',
            text1: t('title.error'),
            text2: message,
            visibilityTime: timeout,
         }),
   };
}
