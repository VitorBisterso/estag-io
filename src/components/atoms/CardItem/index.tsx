import { StyleProp, View, ViewStyle } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import styles from './styles';

interface CardItemProps {
   icon: IconSource;
   text: string;
   style?: StyleProp<ViewStyle>;
}

export default function CardItem({ icon, text, style }: CardItemProps) {
   const theme = useTheme();

   return (
      <View style={[styles.container, style]}>
         <IconButton
            icon={icon}
            iconColor={theme.colors.primary}
            style={styles.icon}
         />
         <Text numberOfLines={1} style={styles.text}>
            {text}
         </Text>
      </View>
   );
}

CardItem.defaultProps = {
   style: {},
};
