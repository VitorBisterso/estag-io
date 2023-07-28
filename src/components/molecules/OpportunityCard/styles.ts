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
