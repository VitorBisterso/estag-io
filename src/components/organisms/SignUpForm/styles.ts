import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   picker: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: PRIMARY_COLOR,
      marginBottom: 16,
   },
   itemStyle: {
      color: 'black',
   },
   button: {
      marginBottom: 50,
   },
});
