import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { DIRECTION_ORDER_TYPE } from '@/models/filters';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import styles from './styles';

export function toggleDirection(
   direction: DIRECTION_ORDER_TYPE,
): DIRECTION_ORDER_TYPE {
   if (direction === 'asc') return 'desc';

   return 'asc';
}

export const itemPerPageOptions = [
   {
      label: '10',
      value: 10,
   },
   {
      label: '25',
      value: 25,
   },
   {
      label: '50',
      value: 50,
   },
];

interface Props {
   children: React.ReactNode;
   itemsPerPage: number;
   setItemsPerPage: (items: number) => void;
   onClear: () => void;
}

export default function Filter({
   children,
   itemsPerPage,
   setItemsPerPage,
   onClear,
}: Props) {
   const { t } = useTranslation();
   const [isOpen, setOpen] = useState(false);

   return (
      <View style={styles.container}>
         <View style={[styles.row, styles.justify]}>
            <View style={styles.row}>
               <Text style={styles.filterText}>{t('filters')}</Text>
               <ThemedIconButton
                  icon={isOpen ? 'filter-variant-minus' : 'filter-variant-plus'}
                  onPress={() => setOpen(!isOpen)}
               />
            </View>
            <Select
               label={t('filters.items.per.page')}
               value={itemsPerPage}
               items={itemPerPageOptions}
               onValueChange={setItemsPerPage}
            />
         </View>
         {isOpen && (
            <>
               {children}
               <Button
                  label={t('buttons.clear.filters')}
                  onPress={onClear}
                  style={styles.button}
               />
            </>
         )}
      </View>
   );
}
