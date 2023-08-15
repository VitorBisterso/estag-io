import { DefaultTheme } from 'react-native-paper';

export const PRIMARY_COLOR = '#2F9E41';
export const PRIMARY_LIGHT = 'rgba(47, 158, 65, 0.15)';
export const SECONDARY_COLOR = '#42CB58';

export default {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY_COLOR,
      primaryContainer: PRIMARY_COLOR,
      onPrimaryContainer: 'white',
      secondary: SECONDARY_COLOR,
      secondaryContainer: '#42CB58',
      onSecondaryContainer: 'white',
      outline: PRIMARY_COLOR,
      elevation: {
         level2: 'white',
      },
   },
};
