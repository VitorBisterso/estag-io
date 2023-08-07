import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OPPORTUNITIES_ICON } from '@/consts';
import { GetOpportunitiesResponse } from '@/models/opportunities';
import Gap from '@/components/atoms/Gap';
import PageHeader from '@/components/molecules/PageHeader';
import OpportunitiesList from '@/components/organisms/OpportunitiesList';
import OpportunityFilter from '@/components/organisms/OpportunityFilter';
import styles from './styles';

interface Props {
   data: GetOpportunitiesResponse;
   isFetching: boolean;
}

export default function OpportunitiesTemplate({ data, isFetching }: Props) {
   const { t } = useTranslation('opportunities');

   return (
      <ScrollView style={styles.container}>
         <Gap gap={32}>
            <PageHeader title={t('header.title')} icon={OPPORTUNITIES_ICON} />
            <View style={styles.content}>
               <OpportunityFilter />
               <OpportunitiesList
                  opportunities={data?.list ?? []}
                  count={data?.count ?? 0}
                  isLoading={isFetching}
               />
            </View>
         </Gap>
      </ScrollView>
   );
}
