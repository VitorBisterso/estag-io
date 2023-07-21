import { NavigationProp, StackActions } from '@react-navigation/native';

import { storeData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, REFRESH_TOKEN_KEY } from '@/consts';

// eslint-disable-next-line import/prefer-default-export
export async function logout(navigation: NavigationProp<any>) {
   storeData(ACCESS_TOKEN_KEY, '');
   storeData(REFRESH_TOKEN_KEY, '');
   navigation.dispatch(StackActions.replace(AUTH_PAGE));
}
