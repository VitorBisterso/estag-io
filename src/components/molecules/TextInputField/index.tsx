import {
   HelperText,
   TextInput,
   TextInputProps,
   useTheme,
} from 'react-native-paper';

interface Props {
   label: string;
   value: string;
   onChangeText: (newValue: string) => void;
   email?: boolean;
   password?: boolean;
   placeholder?: string;
   maxLength?: number;
   onBlur?: () => void;
   hasError?: boolean;
   error?: string;
}

export default function TextInputField({
   label,
   value,
   onChangeText,
   email,
   password,
   placeholder,
   maxLength,
   onBlur,
   hasError,
   error,
}: Props) {
   const theme = useTheme();

   const inputMode: TextInputProps['inputMode'] = email ? 'email' : 'text';
   return (
      <>
         <TextInput
            mode="outlined"
            inputMode={inputMode}
            secureTextEntry={password}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            onBlur={onBlur}
            error={hasError}
            outlineColor={theme.colors.primary}
         />
         <HelperText type="error" visible={hasError}>
            {error}
         </HelperText>
      </>
   );
}

TextInputField.defaultProps = {
   email: false,
   password: false,
   placeholder: undefined,
   maxLength: 255,
   onBlur: undefined,
   hasError: false,
   error: undefined,
};
