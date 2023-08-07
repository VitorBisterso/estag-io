import * as Yup from 'yup';

import { TranslationFunctionType } from '@/utils';

export default function validations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      title: Yup.string().trim().required(requiredMessage),
      description: Yup.string().trim().required(requiredMessage),
      salary: Yup.number().min(0, t('errors.salary')).required(requiredMessage),
      deadline: Yup.date().min(new Date(), t('errors.invalid.date')),
      weeklyWorkload: Yup.number()
         .min(0, t('errors.workload'))
         .required(requiredMessage),
   });
}
