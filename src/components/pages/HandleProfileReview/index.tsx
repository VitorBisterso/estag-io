import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import ReviewsPage from '../Reviews';
import CompaniesPage from '../Companies';

export default function HandleProfileReviewPage() {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   if (profile === 'USER') return <CompaniesPage />;

   return <ReviewsPage />;
}
