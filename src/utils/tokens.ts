import { storeData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/consts';

// eslint-disable-next-line import/prefer-default-export
export async function logout() {
   storeData(ACCESS_TOKEN_KEY, '');
   storeData(REFRESH_TOKEN_KEY, '');
}
