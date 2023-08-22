import { StyleSheet } from 'react-native';

import { LIGHT_GRAY, PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      marginHorizontal: 32,
      backgroundColor: 'white',
      padding: 16,
      paddingBottom: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
   },
   title: {
      textTransform: 'uppercase',
      fontSize: 18,
      fontWeight: 'bold',
   },
   description: {
      fontStyle: 'italic',
      color: LIGHT_GRAY,
      marginTop: 16,
   },
   buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 32,
   },
   button: {
      paddingVertical: 0,
   },
   buttonText: {
      fontSize: 12,
      paddingHorizontal: 4,
   },
});
