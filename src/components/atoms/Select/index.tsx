import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Picker } from '@react-native-picker/picker';
import styles from './styles';

interface Props {
   label: string;
   value: any;
   items: Array<{ label: string; value: any }>;
   onValueChange: (value: any) => void;
}

export default function Select({ label, value, items, onValueChange }: Props) {
   const { t } = useTranslation();

   return (
      <View style={styles.container}>
         <Text>{label}</Text>
         <View style={styles.picker}>
            <Picker
               dropdownIconColor="black"
               placeholder={t('placeholders.select.item')}
               selectedValue={value}
               onValueChange={onValueChange}
            >
               {items.map((item) => (
                  <Picker.Item
                     style={styles.itemStyle}
                     key={item.value}
                     label={item.label}
                     value={item.value}
                  />
               ))}
            </Picker>
         </View>
      </View>
   );
}
