import * as Yup from 'yup';

import { TranslationFunctionType } from '@/utils';

export default function validations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      description: Yup.string().trim().required(requiredMessage),
      rating: Yup.number().required(requiredMessage),
   });
}
