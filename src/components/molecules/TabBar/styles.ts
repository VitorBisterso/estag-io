import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: PRIMARY_COLOR,
      borderWidth: 1,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
   },
   button: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      paddingBottom: 6,
   },
   icon: {
      margin: 0,
      padding: 0,
   },
   text: {
      fontWeight: 'bold',
   },
});
