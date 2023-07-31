import React from 'react';
import {
   StyleProp,
   TextStyle,
   TouchableOpacity,
   View,
   ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';

import styles from './styles';

interface Props {
   title: string;
   children: React.ReactNode;
   onPress?: () => void;
   titleStyle?: StyleProp<TextStyle>;
   headerStyle?: StyleProp<ViewStyle>;
   border?: ViewStyle['borderStyle'];
   renderIcons?: () => React.ReactNode;
}

export default function Card({
   title,
   children,
   onPress,
   titleStyle,
   headerStyle,
   border,
   renderIcons,
}: Props) {
   return (
      <TouchableOpacity
         style={[styles.container, styles.shadow, { borderStyle: border }]}
         onPress={onPress}
      >
         <View style={headerStyle}>
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
               {title}
            </Text>
            {renderIcons?.()}
         </View>
         {children}
      </TouchableOpacity>
   );
}

Card.defaultProps = {
   onPress: undefined,
   titleStyle: {},
   headerStyle: {},
   border: 'solid',
   renderIcons: undefined,
};
