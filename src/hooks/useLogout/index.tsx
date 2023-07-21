import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useToast from '@/hooks/useToast';
import { storeData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, REFRESH_TOKEN_KEY } from '@/consts';

export default function useLogout() {
   const { t } = useTranslation();
   const navigation = useNavigation();
   const toast = useToast();

   async function logout() {
      await storeData(ACCESS_TOKEN_KEY, '');
      await storeData(REFRESH_TOKEN_KEY, '');
      navigation.dispatch(StackActions.replace(AUTH_PAGE));
      toast.success(t('success.logout'));
   }

   return { exit: logout };
}
