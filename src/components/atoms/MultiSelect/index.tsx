import { useTranslation } from 'react-i18next';
import RNMultiSelect from 'react-native-multiple-select';
import { useTheme } from 'react-native-paper';

import styles from './styles';

export interface Item {
   id: number;
   name: string;
}

interface Props {
   items: Array<Item>;
   selectedItems: Array<number>;
   onChange: (ids: Array<number>) => void;
   placeholder: string;
   noItemsText: string;
}

export default function MultiSelect({
   items,
   selectedItems,
   onChange,
   placeholder,
   noItemsText,
}: Props) {
   const theme = useTheme();
   const { t } = useTranslation('multiselect');

   return (
      <RNMultiSelect
         items={items}
         uniqueKey="id"
         displayKey="name"
         onSelectedItemsChange={onChange}
         selectedItems={selectedItems}
         selectText={placeholder}
         searchInputPlaceholderText={t('placeholders.search')}
         tagRemoveIconColor={theme.colors.primary}
         tagBorderColor={theme.colors.primary}
         tagTextColor={theme.colors.primary}
         selectedItemTextColor={theme.colors.primary}
         selectedItemIconColor={theme.colors.primary}
         itemTextColor="#000"
         styleMainWrapper={styles.container}
         searchInputStyle={{ color: '#000' }}
         submitButtonColor={theme.colors.primary}
         submitButtonText={t('buttons.submit')}
         noItemsText={noItemsText}
         hideTags
      />
   );
}
