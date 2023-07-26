import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   picker: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: PRIMARY_COLOR,
      backgroundColor: 'white',
      marginBottom: 16,
      padding: 2,
      minWidth: 100,
   },
   itemStyle: {
      backgroundColor: 'white',
      color: 'black',
   },
});
