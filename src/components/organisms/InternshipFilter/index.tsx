import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { debounce } from 'debounce';

import { useFilterContext } from '@/hooks/useFilter';
import {
   Internship,
   InternshipFilter as InternshipFilterType,
} from '@/models/internships';
import Select from '@/components/atoms/Select';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import TextInputField from '@/components/molecules/TextInputField';
import Filter, { toggleDirection } from '../Filter';
import styles from './styles';

export default function InternshipFilter() {
   const { t } = useTranslation(['internships', 'common']);
   const { state, set, reset } = useFilterContext<InternshipFilterType>();

   const [internName, setInternName] = useState('');
   const [workload, setWorkload] = useState<number>(undefined as any);

   const internshipTypes = [
      { label: t('labels.local', { ns: 'common' }), value: 'LOCAL' },
      { label: t('labels.remote', { ns: 'common' }), value: 'REMOTE' },
   ];
   const orderBy: Array<{ label: string; value: keyof Internship }> = [
      { label: t('filters.order.by.student'), value: 'student' },
      { label: t('filters.order.by.initial.date'), value: 'initialDate' },
      { label: t('filters.order.by.until'), value: 'until' },
   ];

   const debouncedSetWorkload = useCallback(
      debounce((weeklyWorkload: number) => set({ weeklyWorkload }), 500),
      [],
   );
   useEffect(() => {
      debouncedSetWorkload(Number(workload));
   }, [workload]);

   const debouncedSetInternName = useCallback(
      debounce((name: string) => set({ internName: name }), 500),
      [],
   );
   useEffect(() => {
      debouncedSetInternName(internName);
   }, [internName]);

   return (
      <Filter
         itemsPerPage={state.size}
         setItemsPerPage={(itemsPerPage) => set({ size: itemsPerPage })}
         onClear={() => {
            setWorkload(undefined as any);
            setInternName('');
            reset();
         }}
      >
         <View style={styles.container}>
            <View style={styles.row}>
               <TextInputField
                  label={t('filters.student.name')}
                  value={internName}
                  onChangeText={(newName) => {
                     setInternName(newName);
                  }}
               />
            </View>
            <View style={[styles.row, { alignItems: 'flex-end' }]}>
               <View style={styles.select}>
                  <Select
                     label={t('filters.type')}
                     value={state.type}
                     items={internshipTypes}
                     onValueChange={(newType) => set({ type: newType })}
                  />
               </View>
               <TextInputField
                  style={styles.workload}
                  inputMode="numeric"
                  label={t('filters.workload')}
                  value={workload?.toString() ?? ''}
                  onChangeText={(newWorkload) => {
                     setWorkload(Number(newWorkload));
                  }}
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
         </View>
      </Filter>
   );
}
