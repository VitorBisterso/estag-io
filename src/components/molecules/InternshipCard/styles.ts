import { StyleSheet } from 'react-native';

import { GRAY } from '@/theme';

export default StyleSheet.create({
   icon: {
      position: 'absolute',
      right: -16,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   title: {
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   cardContent: {
      marginTop: 16,
   },
   grayText: {
      color: GRAY,
   },
   row: {
      flexDirection: 'row',
   },
   bold: {
      fontWeight: 'bold',
   },
});
