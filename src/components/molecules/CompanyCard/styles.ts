import { StyleSheet } from 'react-native';

import { GRAY } from '@/theme';

export default StyleSheet.create({
   content: {
      marginTop: 8,
   },
   title: {
      marginRight: 'auto',
   },
   text: {
      color: GRAY,
   },
   italic: {
      fontStyle: 'italic',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   rating: {
      marginRight: 'auto',
   },
   button: {
      marginTop: 8,
      paddingVertical: 0,
   },
   buttonText: {
      fontSize: 12,
      paddingHorizontal: 4,
   },
});
