import { useMemo, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import TextInputField from '@/components/molecules/TextInputField';
import { intlDateFormatter } from '@/utils';

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

   const dateFormat = useMemo(intlDateFormatter, []);
   const currentDate = useMemo(
      () => (date ? (new Date(date) as any) : undefined),
      [date],
   );
   const formattedDate = currentDate ? dateFormat.format(currentDate) : '';
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
            date={currentDate ?? new Date()}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(newDate) => {
               hideDatePicker();
               onChange(newDate);
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
