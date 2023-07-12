import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Number(StatusBar.currentHeight) + 16,
   },
   contentWrapper: {
      marginTop: 32,
      marginHorizontal: 32,
   },
});
