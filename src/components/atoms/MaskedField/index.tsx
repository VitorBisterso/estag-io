import { Text, useTheme } from 'react-native-paper';
import MaskInput, { Mask, Masks } from 'react-native-mask-input';
import styles from './styles';

type MaskedType = 'cnpj' | 'phone' | 'money';

interface Props {
   label: string;
   value: string;
   onChange: (newValue: string) => void;
   type: MaskedType;
   onBlur?: (e: any) => void;
   hasError?: boolean;
   error?: string;
}

interface MaskedConfigs {
   mask: (string | RegExp)[] | Mask;
   maxLength: number;
   placeholder: string;
}

export default function MaskedField({
   label,
   value,
   onChange,
   type,
   onBlur,
   hasError,
   error,
}: Props) {
   const theme = useTheme();
   const borderColor = hasError ? 'red' : theme.colors.primary;

   const configs: Record<MaskedType, MaskedConfigs> = {
      cnpj: {
         mask: Masks.BRL_CNPJ,
         maxLength: 18,
         placeholder: '99.999.999/9999-99',
      },
      phone: {
         mask: Masks.BRL_PHONE,
         maxLength: 15,
         placeholder: '(99) 99999-9999',
      },
      money: {
         mask: Masks.BRL_CURRENCY,
         maxLength: 255,
         placeholder: 'R$ 0,00',
      },
   };

   return (
      <>
         <Text>{label}</Text>
         <MaskInput
            inputMode="numeric"
            style={[styles.input, { borderColor }]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mask={configs[type].mask}
            maxLength={configs[type].maxLength}
            placeholder={configs[type].placeholder}
            placeholderTextColor={theme.colors.onSurfaceDisabled}
         />
         {hasError && <Text style={{ color: 'red' }}>{error}</Text>}
      </>
   );
}

MaskedField.defaultProps = {
   onBlur: undefined,
   hasError: false,
   error: undefined,
};
