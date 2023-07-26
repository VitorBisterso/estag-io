import { ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import styles from './styles';

interface Props {
   icon: IconSource;
   onPress?: () => void;
   disabled?: boolean;
   style?: ViewStyle;
}

export default function ThemedIconButton({
   icon,
   onPress,
   disabled,
   style,
}: Props) {
   return (
      <IconButton
         icon={icon}
         style={[styles.button, style]}
         onPress={onPress}
         disabled={disabled}
      />
   );
}

ThemedIconButton.defaultProps = {
   onPress: undefined,
   disabled: false,
   style: undefined,
};
