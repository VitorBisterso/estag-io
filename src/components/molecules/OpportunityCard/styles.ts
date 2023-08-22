import { StyleSheet } from 'react-native';

import { GRAY, LIGHT_GRAY } from '@/theme';

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
      color: GRAY,
   },
   description: {
      marginVertical: 16,
      fontStyle: 'italic',
      color: LIGHT_GRAY,
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
