import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight,
   },
   contentWrapper: {
      marginTop: 32,
      marginHorizontal: 32,
   },
});
