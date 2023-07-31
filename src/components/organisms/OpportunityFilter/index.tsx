import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Checkbox, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { useFilterContext } from '@/hooks/useFilter';
import {
   Opportunity,
   OpportunityFilter as OpportunityFilterType,
} from '@/models/opportunities';
import Select from '@/components/atoms/Select';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import Filter, { toggleDirection } from '../Filter';
import styles from './styles';

export default function OpportunityFilter() {
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const { t } = useTranslation(['opportunities', 'common']);
   const { state, set, reset } = useFilterContext<OpportunityFilterType>();

   const opportunityTypes = [
      { label: t('filters.type.local'), value: 'LOCAL' },
      { label: t('filters.type.remote'), value: 'REMOTE' },
   ];
   const weeklyWorkloads = [
      { label: '20h', value: 20 },
      { label: '30h', value: 30 },
   ];
   const orderBy: Array<{ label: string; value: keyof Opportunity }> = [
      { label: t('filters.order.by.title'), value: 'title' },
      { label: t('filters.order.by.type'), value: 'type' },
      { label: t('filters.order.by.salary'), value: 'salary' },
      { label: t('filters.order.by.deadline'), value: 'deadline' },
      { label: t('filters.order.by.workload'), value: 'weeklyWorkload' },
   ];

   return (
      <Filter
         itemsPerPage={state.size}
         setItemsPerPage={(itemsPerPage) => set({ size: itemsPerPage })}
         onClear={reset}
      >
         <View style={styles.container}>
            <View style={styles.row}>
               <View style={styles.select}>
                  <Select
                     label={t('filters.type')}
                     value={state.type}
                     items={opportunityTypes}
                     onValueChange={(newType) => set({ type: newType })}
                  />
               </View>
               <Select
                  label={t('filters.workload')}
                  value={state.weeklyWorkload}
                  items={weeklyWorkloads}
                  onValueChange={(newWorkload) =>
                     set({ weeklyWorkload: newWorkload })
                  }
               />
            </View>
            <View style={styles.row}>
               <View style={styles.select}>
                  <Select
                     label={t('filters.order.by', { ns: 'common' })}
                     value={state.orderBy}
                     items={orderBy}
                     onValueChange={(newCriteria) =>
                        set({ orderBy: newCriteria })
                     }
                  />
               </View>
               <ThemedIconButton
                  icon={state.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                  onPress={() =>
                     set({ direction: toggleDirection(state.direction) })
                  }
               />
            </View>
            {profile === 'USER' && (
               <View style={styles.row}>
                  <Text>{t('filters.only.applied')}</Text>
                  <Checkbox
                     status={state.registeredOnly ? 'checked' : 'unchecked'}
                     onPress={() =>
                        set({ registeredOnly: !state.registeredOnly })
                     }
                  />
               </View>
            )}
         </View>
      </Filter>
   );
}
