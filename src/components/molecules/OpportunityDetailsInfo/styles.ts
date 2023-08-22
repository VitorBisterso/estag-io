import { StyleSheet } from 'react-native';

import { GRAY } from '@/theme';

export default StyleSheet.create({
   descriptionTitle: {
      fontSize: 24,
   },
   description: {
      fontStyle: 'italic',
      color: GRAY,
      textAlign: 'justify',
      marginBottom: 8,
   },
});
