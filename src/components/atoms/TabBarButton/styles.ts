import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
