import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Picker } from '@react-native-picker/picker';
import styles from './styles';

interface Props {
   label: string;
   value: any;
   items: Array<{ label: string | number; value: any }>;
   onValueChange: (value: any) => void;
   visible?: boolean;
   innerRef?: any;
}

export default function Select({
   label,
   value,
   items,
   onValueChange,
   visible,
   innerRef,
}: Props) {
   const { t } = useTranslation();

   return (
      <View style={styles.container}>
         {visible && <Text>{label}</Text>}
         <View style={visible && styles.picker}>
            <Picker
               ref={innerRef}
               dropdownIconColor={visible ? 'black' : 'white'}
               placeholder={t('placeholders.select.item')}
               selectedValue={value}
               onValueChange={onValueChange}
               style={{ display: visible ? 'flex' : 'none' }}
            >
               {items.map((item) => (
                  <Picker.Item
                     style={styles.itemStyle}
                     key={item.value}
                     label={String(item.label)}
                     value={item.value}
                  />
               ))}
            </Picker>
         </View>
      </View>
   );
}

Select.defaultProps = {
   visible: true,
   innerRef: undefined,
};
