import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import MyInternshipPage from '../MyInternship';

export default function InternshipsPage() {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   if (profile === 'USER') return <MyInternshipPage />;

   return <Text>Tela de estágios</Text>;
}
