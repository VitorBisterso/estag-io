import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   row: {
      flexDirection: 'row',
   },
   icon: {
      margin: 0,
      padding: 0,
   },
   cardTitle: {
      textAlign: 'left',
      maxWidth: '75%',
   },
   cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },

   simplifiedContainer: {
      marginBottom: 8,
      justifyContent: 'center',
   },
   titleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
   },
   title: {
      fontSize: 22,
      fontWeight: 'bold',
   },
   description: {
      fontStyle: 'italic',
      color: 'gray',
      textAlign: 'justify',
      marginTop: 16,
   },
});