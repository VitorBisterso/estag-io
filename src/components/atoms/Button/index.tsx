import { StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import defaultStyles from './styles';

interface Props {
   label: string;
   onPress: () => void;
   style?: StyleProp<ViewStyle>;
   disabled?: boolean;
   loading?: boolean;
   uppercase?: boolean;
}

export default function Button({
   label,
   onPress,
   style,
   disabled,
   loading,
   uppercase,
}: Props) {
   return (
      <PaperButton
         mode="contained"
         onPress={onPress}
         style={[style, defaultStyles.button]}
         disabled={disabled}
         loading={loading}
         uppercase={uppercase}
      >
         {label}
      </PaperButton>
   );
}

Button.defaultProps = {
   style: undefined,
   disabled: false,
   loading: false,
   uppercase: true,
};
