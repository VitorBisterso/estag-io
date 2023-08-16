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
import { useGetOpportunityByIdQuery } from '@/services';
import Loader from '@/components/atoms/Loader';

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
   const { data: opportunity, isFetching } =
      useGetOpportunityByIdQuery(opportunityId);

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         deadline: '',
         onlyOnDeadline: false,
         everyone: true,
         applicants: [] as Array<number>,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         const { values } = formik;
         if (values.everyone) {
            values.applicants = [];
         } else if (values.applicants.length <= 0) {
            toast.error('errors.applicants');
            return;
         }
         createProcessStep({ opportunityId, processStep: values })
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

   if (isFetching) return <Loader size={64} />;

   return (
      <ProcessStepFormContext.Provider value={providerValue}>
         <CreateProcessStepTemplate
            applicants={opportunity?.applicants ?? []}
         />
      </ProcessStepFormContext.Provider>
   );
}
