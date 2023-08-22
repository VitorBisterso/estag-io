import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   wrapper: {
      flex: 1,
   },
   container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   emptyText: {
      fontSize: 24,
      color: 'black',
      textAlign: 'center',
      maxWidth: '75%',
      fontWeight: 'bold',
   },
});
