import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { useNavigation, StackActions } from '@react-navigation/native';

import { getData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, OPPORTUNITIES_PAGE } from '@/consts';

export default function SplashScreenPage() {
   const navigation = useNavigation();
   async function handleOpenApp() {
      const token = await getData(ACCESS_TOKEN_KEY);

      navigation.dispatch(
         StackActions.replace(token ? OPPORTUNITIES_PAGE : AUTH_PAGE),
      );
   }

   useEffect(() => {
      handleOpenApp();
   }, []);

   return <Text>splash screen</Text>;
}
