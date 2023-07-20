import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { useNavigation, StackActions } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { getData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, OPPORTUNITIES_PAGE } from '@/consts';
import { AccessToken } from '@/models/auth';
import { setProfile } from '@/store/states/profile';

export default function SplashScreenPage() {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   async function handleOpenApp() {
      const token = await getData(ACCESS_TOKEN_KEY);
      const decoded = jwtDecode<AccessToken>(token);

      dispatch(setProfile(decoded.userType));
      navigation.dispatch(
         StackActions.replace(token ? OPPORTUNITIES_PAGE : AUTH_PAGE),
      );
   }

   useEffect(() => {
      handleOpenApp();
   }, []);

   return <Text>splash screen</Text>;
}
