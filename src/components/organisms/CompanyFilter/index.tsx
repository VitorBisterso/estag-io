import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { debounce } from 'debounce';

import { useFilterContext } from '@/hooks/useFilter';
import { Company, CompanyFilter as CompanyFilterType } from '@/models/reviews';
import Select from '@/components/atoms/Select';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import TextInputField from '@/components/molecules/TextInputField';
import Filter, { toggleDirection } from '../Filter';
import styles from './styles';

export default function CompanyFilter() {
   const { t } = useTranslation(['reviews', 'common']);
   const { state, set, reset } = useFilterContext<CompanyFilterType>();

   const [name, setName] = useState('');

   const orderBy: Array<{ label: string; value: keyof Company }> = [
      { label: t('filters.order.by.name'), value: 'name' },
      { label: t('filters.order.by.rating'), value: 'rating' },
   ];

   const debouncedSetName = useCallback(
      debounce((newName: string) => set({ name: newName }), 500),
      [],
   );
   useEffect(() => {
      debouncedSetName(name);
   }, [name]);

   return (
      <Filter
         itemsPerPage={state.size}
         setItemsPerPage={(itemsPerPage) => set({ size: itemsPerPage })}
         onClear={() => {
            setName('');
            reset();
         }}
      >
         <View style={styles.container}>
            <TextInputField
               label={t('filters.name')}
               value={name}
               onChangeText={(newName) => {
                  setName(newName);
               }}
            />
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
         </View>
      </Filter>
   );
}
