import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox, IconButton, Text } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import { PRIMARY_COLOR } from '@/theme';
import styles from './styles';

interface Props {
   label: string;
   value: string | number;
   style?: StyleProp<ViewStyle>;
   // eslint-disable-next-line react/require-default-props
   valueColor?: string;
   valueIcon?: IconSource;
   hasCheckbox?: boolean;
   checkboxValue?: boolean;
}

export default function DetailsItem({
   label,
   value,
   style,
   valueColor = PRIMARY_COLOR,
   valueIcon,
   hasCheckbox,
   checkboxValue,
}: Props) {
   function renderValue() {
      if (hasCheckbox)
         return <Checkbox status={checkboxValue ? 'checked' : 'unchecked'} />;

      return (
         <>
            <Text style={[styles.text, { color: valueColor }]}>{value}</Text>
            {valueIcon && (
               <IconButton icon={valueIcon} iconColor={valueColor} />
            )}
         </>
      );
   }

   return (
      <View style={[styles.container, style]}>
         <Text style={styles.text}>{`${label}: `}</Text>
         {renderValue()}
      </View>
   );
}

DetailsItem.defaultProps = {
   style: {},
   valueIcon: '',
   hasCheckbox: false,
   checkboxValue: false,
};
