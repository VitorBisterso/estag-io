import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

interface Props {
   title: string;
   icon?: string;
   hasBackButton?: boolean;
}

export default function PageHeader({ title, icon, hasBackButton }: Props) {
   const theme = useTheme();
   const navigation = useNavigation();

   function renderBackButton() {
      if (!hasBackButton) return null;

      return (
         <ThemedIconButton
            icon="chevron-left"
            onPress={() => navigation.goBack()}
         />
      );
   }

   function renderIcon() {
      if (!icon) return null;

      return (
         <IconButton
            icon={icon}
            size={48}
            iconColor={theme.colors.primary}
            style={styles.icon}
         />
      );
   }

   return (
      <View style={styles.container}>
         {renderBackButton()}
         <Text style={styles.title} numberOfLines={2}>
            {title}
         </Text>
         {renderIcon()}
      </View>
   );
}

PageHeader.defaultProps = {
   icon: undefined,
   hasBackButton: false,
};
