import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
   DEFAULT_DIRECTION,
   FIRST_PAGE,
   OPPORTUNITIES_ICON,
   PAGE_SIZE,
} from '@/consts';
import { OpportunityFilter as OpportunityFilterType } from '@/models/opportunities';
import Gap from '@/components/atoms/Gap';
import PageHeader from '@/components/molecules/PageHeader';
import OpportunitiesList from '@/components/organisms/OpportunitiesList';
import OpportunityFilter from '@/components/organisms/OpportunityFilter';
import useFilter, { FilterProvider } from '@/hooks/useFilter';
import { useLazyGetOpportunitiesQuery } from '@/services/opportunities';
import styles from './styles';

export default function OpportunitiesTemplate() {
   const { t } = useTranslation('opportunities');

   const [getOpportunities, { data: opportunities, isLoading }] =
      useLazyGetOpportunitiesQuery();

   const initialState: OpportunityFilterType = {
      size: PAGE_SIZE,
      page: FIRST_PAGE,
      title: '',
      type: undefined,
      weeklyWorkload: undefined,
      orderBy: 'title',
      direction: DEFAULT_DIRECTION,
   };
   const filter = useFilter({
      initialState,
      onChangeState: getOpportunities,
   });

   return (
      <FilterProvider filter={filter}>
         <View style={styles.container}>
            <Gap gap={32}>
               <PageHeader
                  title={t('header.title')}
                  icon={OPPORTUNITIES_ICON}
               />
               <View style={styles.content}>
                  <OpportunityFilter />
                  <OpportunitiesList
                     opportunities={opportunities ?? []}
                     isLoading={isLoading}
                  />
               </View>
            </Gap>
         </View>
      </FilterProvider>
   );
}
