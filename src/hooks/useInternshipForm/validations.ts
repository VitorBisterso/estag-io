import * as Yup from 'yup';

import { TranslationFunctionType } from '@/utils';

export default function validations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      initialDate: Yup.date().min(new Date(), t('errors.invalid.date')),
      until: Yup.date().min(Yup.ref('initialDate'), t('errors.invalid.until')),
      managerName: Yup.string().trim().required(requiredMessage),
      advisorName: Yup.string().trim().required(requiredMessage),
      studentId: Yup.number().required(requiredMessage),
      jobId: Yup.number().required(requiredMessage),
   });
}
