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
});
