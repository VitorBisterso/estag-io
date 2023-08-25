import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { CREATE_OPPORTUNTITY_PAGE, OPPORTUNITIES_ICON } from '@/consts';
import { GetOpportunitiesResponse } from '@/models/opportunities';
import Fab from '@/components/atoms/Fab';
import Gap from '@/components/atoms/Gap';
import PageHeader from '@/components/molecules/PageHeader';
import OpportunitiesList from '@/components/organisms/OpportunitiesList';
import OpportunityFilter from '@/components/organisms/OpportunityFilter';
import { RootState } from '@/store';
import styles from './styles';

interface Props {
   data: GetOpportunitiesResponse;
   isFetching: boolean;
}

export default function OpportunitiesTemplate({ data, isFetching }: Props) {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const { t } = useTranslation('opportunities');
   const navigation = useNavigation<any>();

   return (
      <>
         <PageHeader title={t('header.title')} icon={OPPORTUNITIES_ICON} />
         <ScrollView style={styles.container}>
            <Gap gap={32} style={styles.content}>
               <OpportunityFilter />
               <OpportunitiesList
                  opportunities={data?.list ?? []}
                  count={data?.count ?? 0}
                  isLoading={isFetching}
               />
            </Gap>
         </ScrollView>
         {profile === 'COMPANY' && (
            <Fab
               icon="plus"
               onPress={() => navigation.navigate(CREATE_OPPORTUNTITY_PAGE)}
            />
         )}
      </>
   );
}
