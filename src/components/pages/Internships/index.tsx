import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import MyInternshipPage from '../MyInternship';
import InternshipsListPage from '../InternshipsList';

export default function InternshipsPage() {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   if (profile === 'USER') return <MyInternshipPage />;

   return <InternshipsListPage />;
}
