import { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import { getData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, LOGGED_ROUTES } from '@/consts';
import { AccessToken } from '@/models/auth';
import { setProfile } from '@/store/states/profile';
import styles from './styles';

export default function SplashScreenPage() {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   async function handleOpenApp() {
      const token = await getData(ACCESS_TOKEN_KEY);
      if (!token) {
         navigation.dispatch(StackActions.replace(AUTH_PAGE));
         return;
      }

      const decoded = jwtDecode<AccessToken>(token);
      dispatch(setProfile(decoded.userType));
      navigation.dispatch(
         StackActions.replace(token ? LOGGED_ROUTES : AUTH_PAGE),
      );
   }

   useEffect(() => {
      const splashTimer = setTimeout(() => handleOpenApp(), 1000);
      return () => clearTimeout(splashTimer);
   }, []);

   return (
      <View style={styles.container}>
         <LottieView
            // eslint-disable-next-line global-require
            source={require('@/assets/animations/splashScreen.json')}
            style={styles.animation}
            autoPlay
            loop
         />
      </View>
   );
}
