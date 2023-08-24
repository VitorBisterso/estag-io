import { StyleSheet } from 'react-native';

import { GRAY, LIGHT_GRAY } from '@/theme';

export default StyleSheet.create({
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   date: {
      marginLeft: 16,
      fontStyle: 'italic',
      color: GRAY,
   },
   description: {
      marginTop: 8,
      fontStyle: 'italic',
      color: LIGHT_GRAY,
      textAlign: 'justify',
   },
});
