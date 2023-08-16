import { useMemo } from 'react';
import { Route, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import useToast from '@/hooks/useToast';
import { useCreateProcessStepMutation } from '@/services/processSteps';
import validations from '@/hooks/useProcessStepForm/validations';
import { OPPORTUNITY_DETAILS_PAGE } from '@/consts';
import { ProcessStepFormContext } from '@/hooks/useProcessStepForm';
import CreateProcessStepTemplate from '@/components/templates/CreateProcessStep';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { opportunityId: number }>;
}

export default function CreateProcessStepPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { opportunityId } = route!.params;

   const { t } = useTranslation('processSteps');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [createProcessStep, { isLoading: isCreating }] =
      useCreateProcessStepMutation();

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         deadline: '',
         onlyOnDeadline: false,
         everyone: false,
         applicants: [] as Array<number>,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         createProcessStep({ opportunityId, processStep: formik.values })
            .unwrap()
            .then(() => {
               toast.success(
                  t('success.created', {
                     ns: 'common',
                     object: t('labels.success.process.step'),
                  }),
               );
               navigation.navigate(OPPORTUNITY_DETAILS_PAGE, {
                  id: opportunityId,
               });
            });
      },
   });

   const providerValue = useMemo(
      () => ({
         formik,
         isLoading: isCreating,
      }),
      [formik, isCreating],
   );

   return (
      <ProcessStepFormContext.Provider value={providerValue}>
         <CreateProcessStepTemplate />
      </ProcessStepFormContext.Provider>
   );
}
