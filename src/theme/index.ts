import { DefaultTheme } from 'react-native-paper';

export const PRIMARY_COLOR = '#2F9E41';
export const SECONDARY_COLOR = '#42CB58';

export default {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY_COLOR,
      secondary: SECONDARY_COLOR,
      secondaryContainer: '#42CB58',
      onSecondaryContainer: '#FFFFFF',
   },
};
