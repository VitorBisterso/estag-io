import { StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';

interface Props {
   label: string;
   value: string;
   onChangeText?: (newValue: string) => void;
   inputMode?: TextInputProps['inputMode'];
   password?: boolean;
   placeholder?: string;
   maxLength?: number;
   onBlur?: (e: any) => void;
   onPressIn?: () => void;
   hasError?: boolean;
   error?: string;
   multiline?: boolean;
   numberOfLines?: number;
   style?: StyleProp<ViewStyle>;
}

export default function TextInputField({
   label,
   value,
   onChangeText,
   inputMode,
   password,
   placeholder,
   maxLength,
   onBlur,
   onPressIn,
   hasError,
   error,
   multiline,
   numberOfLines,
   style,
}: Props) {
   const theme = useTheme();

   return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
         <TextInput
            mode="outlined"
            multiline={multiline}
            numberOfLines={numberOfLines}
            inputMode={inputMode}
            secureTextEntry={password}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            onBlur={onBlur}
            onPressIn={onPressIn}
            error={hasError}
            outlineColor={theme.colors.primary}
            style={[
               style,
               {
                  backgroundColor: 'white',
               },
            ]}
            placeholderTextColor={theme.colors.onSurfaceDisabled}
         />
         <HelperText type="error" visible={hasError}>
            {error}
         </HelperText>
      </View>
   );
}

TextInputField.defaultProps = {
   onChangeText: undefined,
   inputMode: 'text',
   password: false,
   placeholder: undefined,
   maxLength: 255,
   onBlur: undefined,
   onPressIn: undefined,
   hasError: false,
   error: undefined,
   multiline: false,
   numberOfLines: 1,
   style: {},
};
