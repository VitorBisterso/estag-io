import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import defaultStyles from './styles';

interface Props {
   label: string;
   onPress: () => void;
   style?: StyleProp<ViewStyle>;
   disabled?: boolean;
   loading?: boolean;
   uppercase?: boolean;
   mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
   small?: boolean;
   textStyle?: StyleProp<TextStyle>;
}

export default function Button({
   label,
   onPress,
   style,
   disabled,
   loading,
   uppercase,
   mode,
   small,
   textStyle,
}: Props) {
   return (
      <PaperButton
         mode={mode}
         onPress={onPress}
         style={[defaultStyles.button, style]}
         labelStyle={textStyle}
         disabled={disabled}
         loading={loading}
         uppercase={uppercase}
         compact={small}
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
   mode: 'contained',
   small: false,
   textStyle: {},
};
