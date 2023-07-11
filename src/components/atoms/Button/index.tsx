import { StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import defaultStyles from './styles';

interface Props {
   label: string;
   onPress: () => void;
   style?: StyleProp<ViewStyle>;
   disabled?: boolean;
   loading?: boolean;
}

export default function Button({
   label,
   onPress,
   style,
   disabled,
   loading,
}: Props) {
   return (
      <PaperButton
         mode="contained"
         onPress={onPress}
         // @ts-expect-error does not suport spread in style prop
         style={{ ...style, ...defaultStyles.button }}
         disabled={disabled}
         loading={loading}
      >
         {label}
      </PaperButton>
   );
}

Button.defaultProps = {
   style: undefined,
   disabled: false,
   loading: false,
};
