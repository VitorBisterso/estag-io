import * as Yup from 'yup';

import { TranslationFunctionType } from '@/utils';

function isSalaryValid(s?: string) {
   if (!s) return false;

   const salary = s.trim();
   if (salary.length < 4) return false;

   const onlyNumbers = s.slice(3).replaceAll('.', '').replaceAll(',', '');

   return Number(onlyNumbers) > 0;
}

export default function validations(t: TranslationFunctionType) {
   const requiredMessage = t('errors.required.field', { ns: 'common' });

   return Yup.object({
      title: Yup.string().trim().required(requiredMessage),
      description: Yup.string().trim().required(requiredMessage),
      salary: Yup.string()
         .test('Is salary valid', t('errors.salary'), isSalaryValid)
         .required(requiredMessage),
      deadline: Yup.date().min(new Date(), t('errors.invalid.date')),
      weeklyWorkload: Yup.number()
         .min(0, t('errors.workload'))
         .required(requiredMessage),
   });
}
