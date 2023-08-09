import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   subtitle: {
      marginTop: 8,
   },
   subtitleText: {
      maxWidth: '40%',
      color: 'gray',
   },
   description: {
      marginVertical: 16,
      fontStyle: 'italic',
      color: 'rgba(37, 37, 37, 0.75)',
   },
   currency: {
      maxWidth: '30%',
      marginRight: 8,
   },

   companyTitle: {
      textAlign: 'left',
      maxWidth: '75%',
   },
   companyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   icons: {
      flexDirection: 'row',
   },
   iconButton: {
      margin: 0,
      padding: 0,
   },
   activeSwitch: {
      position: 'absolute',
      bottom: -14,
      left: '48%',
   },
});
