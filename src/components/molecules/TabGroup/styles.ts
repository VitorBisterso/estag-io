import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 32,
   },
   tabButton: {
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingBottom: 2,
      paddingHorizontal: 6,
   },
   tabButtonText: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: 13,
   },
});
