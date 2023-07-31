import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      marginBottom: 32,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: 4,
      padding: 16,
   },
   shadow: {
      shadowColor: 'black',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
   },
});
