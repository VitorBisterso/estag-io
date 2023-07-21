import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Button from '@/components/atoms/Button';
import PageHeader from '@/components/molecules/PageHeader';
import { logout } from '@/utils';
import { RootState } from '@/store';
import { OPPORTUNITIES_ICON } from '@/consts';

export default function OpportunitiesPage() {
   const { t } = useTranslation('opportunities');
   const navigation = useNavigation();
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   return (
      <>
         <PageHeader title={t('header.title')} icon={OPPORTUNITIES_ICON} />
         <Button
            label={`LOGOUT-${profile}`}
            onPress={() => logout(navigation)}
         />
      </>
   );
}
