import { useSelector } from 'react-redux';

import { logout } from '@/utils';
import Button from '@/components/atoms/Button';
import { RootState } from '@/store';

export default function OpportunitiesPage() {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   return <Button label={`LOGOUT-${profile}`} onPress={logout} />;
}
