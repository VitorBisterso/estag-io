import { useMemo, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import Select from '@/components/atoms/Select';
import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import styles from './styles';

interface Props {
   currentPage: number;
   pageSize: number;
   itemsCount: number;
   onChange: (newPage: number) => void;
}

export default function Pagination({
   currentPage,
   pageSize,
   itemsCount,
   onChange,
}: Props) {
   const { t } = useTranslation();
   const selectRef = useRef<TextInput>();
   const [goToPage, setGoToPage] = useState(1);

   const totalPages = useMemo(() => {
      let pages = Math.floor(itemsCount / pageSize);

      if (itemsCount % pageSize !== 0) pages += 1;

      return pages;
   }, [itemsCount, pageSize]);

   const allPageOptions = useMemo(
      () =>
         Array.from({ length: totalPages }, (v, k) => {
            const pageNumber = k + 1;
            return { label: pageNumber, value: pageNumber };
         }),
      [totalPages],
   );

   function renderPagination() {
      return (
         <View style={styles.row}>
            <>
               <ThemedIconButton
                  icon="chevron-double-left"
                  style={styles.arrow}
                  disabled={currentPage <= 1}
                  onPress={() => onChange(1)}
               />
               <ThemedIconButton
                  icon="chevron-left"
                  style={styles.arrow}
                  disabled={currentPage <= 1}
                  onPress={() => onChange(currentPage - 1)}
               />
               <Text
                  style={styles.text}
                  onPress={() => selectRef.current?.focus()}
               >
                  {t('labels.pagination.current', {
                     current: currentPage,
                     total: totalPages,
                  })}
               </Text>
               <ThemedIconButton
                  icon="chevron-right"
                  style={styles.arrow}
                  disabled={currentPage >= totalPages}
                  onPress={() => onChange(currentPage + 1)}
               />
               <ThemedIconButton
                  icon="chevron-double-right"
                  style={styles.arrow}
                  disabled={currentPage >= totalPages}
                  onPress={() => onChange(totalPages)}
               />
            </>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         {renderPagination()}
         <View style={[styles.row, styles.bottom]}>
            <Select
               innerRef={selectRef}
               label={t('labels.pagination.go.to')}
               items={allPageOptions}
               value={goToPage}
               onValueChange={(newPage) => {
                  setGoToPage(newPage);
                  onChange(newPage);
               }}
               visible={false}
            />
         </View>
      </View>
   );
}
