import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import TextInputField from '@/components/molecules/TextInputField';

interface Props {
   date: string;
   onChange: (newDate: Date) => void;
   onBlur?: (e: any) => void;
   hasError?: boolean;
   error?: string;
}

export default function DateField({
   date,
   onChange,
   onBlur,
   hasError,
   error,
}: Props) {
   const { t } = useTranslation('auth');
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

   function hideDatePicker() {
      setDatePickerVisibility(false);
   }

   return (
      <>
         <TextInputField
            inputMode="none"
            label={t('labels.birthday')}
            placeholder="02/02/2002"
            value={date}
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
   onBlur: undefined,
   hasError: false,
   error: undefined,
};
