import { useMemo, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import TextInputField from '@/components/molecules/TextInputField';

interface Props {
   label: string;
   placeholder?: string;
   date: string;
   onChange: (newDate: Date) => void;
   onBlur?: (e: any) => void;
   hasError?: boolean;
   error?: string;
}

export default function DateField({
   label,
   placeholder,
   date,
   onChange,
   onBlur,
   hasError,
   error,
}: Props) {
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

   function hideDatePicker() {
      setDatePickerVisibility(false);
   }

   const dateFormat = useMemo(() => new Intl.DateTimeFormat(['ban', 'id']), []);
   const formattedDate = date ? dateFormat.format(new Date(date) as any) : '';
   return (
      <>
         <TextInputField
            inputMode="none"
            label={label}
            placeholder={placeholder}
            value={formattedDate}
            onPressIn={() => setDatePickerVisibility(true)}
            onBlur={onBlur}
            hasError={hasError}
            error={error}
         />
         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(newDate) => {
               onChange(newDate);
               hideDatePicker();
            }}
            onCancel={hideDatePicker}
         />
      </>
   );
}

DateField.defaultProps = {
   placeholder: '02/02/2002',
   onBlur: undefined,
   hasError: false,
   error: undefined,
};
