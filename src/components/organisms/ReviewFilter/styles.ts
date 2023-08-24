import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   select: {
      flex: 1,
      marginRight: 8,
   },
   workload: {
      paddingBottom: 12,
      marginBottom: -10,
   },
});
