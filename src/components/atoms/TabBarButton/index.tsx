import { TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import styles from './styles';

export interface Props {
   label: string;
   onPress: () => void;
   isFocused: boolean;
   options: {
      tabBarAccessibilityLabel: string;
      tabBarIcon: string;
   };
   backgroundColor: string;
   textColor: string;
}

export default function TabBarButton({
   label,
   onPress,
   isFocused,
   options,
   backgroundColor,
   textColor,
}: Props) {
   return (
      <TouchableOpacity
         onPress={onPress}
         accessibilityState={isFocused ? { selected: true } : {}}
         accessibilityLabel={options.tabBarAccessibilityLabel}
         style={[styles.button, { backgroundColor }]}
      >
         <IconButton
            icon={options.tabBarIcon}
            iconColor={textColor}
            style={styles.icon}
         />
         <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
   );
}
