import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import styles from './styles';

interface CardItemProps {
   icon: IconSource;
   text: string;
}

export default function CardItem({ icon, text }: CardItemProps) {
   const theme = useTheme();

   return (
      <View style={styles.container}>
         <IconButton
            icon={icon}
            iconColor={theme.colors.primary}
            style={styles.icon}
         />
         <Text>{text}</Text>
      </View>
   );
}
