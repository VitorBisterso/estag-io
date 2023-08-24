import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { debounce } from 'debounce';

import { useFilterContext } from '@/hooks/useFilter';
import { Review, ReviewFilter as ReviewFilterType } from '@/models/reviews';
import Select from '@/components/atoms/Select';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import TextInputField from '@/components/molecules/TextInputField';
import Filter, { toggleDirection } from '../Filter';
import styles from './styles';

export default function ReviewFilter() {
   const { t } = useTranslation(['reviews', 'common']);
   const { state, set, reset } = useFilterContext<ReviewFilterType>();

   const [description, setDescription] = useState('');

   const orderBy: Array<{ label: string; value: keyof Review }> = [
      { label: t('filters.order.by.rating'), value: 'rating' },
      { label: t('filters.order.by.date'), value: 'createdAt' },
   ];

   const debouncedSetDescription = useCallback(
      debounce((name: string) => set({ description: name }), 500),
      [],
   );
   useEffect(() => {
      debouncedSetDescription(description);
   }, [description]);

   return (
      <Filter
         itemsPerPage={state.size}
         setItemsPerPage={(itemsPerPage) => set({ size: itemsPerPage })}
         onClear={() => {
            setDescription('');
            reset();
         }}
      >
         <View style={styles.container}>
            <TextInputField
               label={t('filters.description')}
               value={description}
               onChangeText={(desc) => {
                  setDescription(desc);
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
