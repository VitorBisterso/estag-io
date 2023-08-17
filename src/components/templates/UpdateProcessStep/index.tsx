import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { Applicant, ProcessStep } from '@/models/processSteps';
import { useUpdateProcessStepMutation } from '@/services/processSteps';
import { ProcessStepFormContext } from '@/hooks/useProcessStepForm';
import ProcessStepForm from '@/components/organisms/ProcessStepForm';
import validations from '@/hooks/useProcessStepForm/validations';
import styles from './styles';

interface Props {
   availableApplicants: Array<Applicant>;
   processStep: ProcessStep;
}

export default function UpdateProcessStepTemplate({
   availableApplicants,
   processStep,
}: Props) {
   const { t } = useTranslation('processSteps');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [updateProcessStep, { isLoading: isUpdating }] =
      useUpdateProcessStepMutation();

   const allApplicants = useMemo(
      () => availableApplicants.map((applicant) => applicant.id),
      [availableApplicants],
   );
   const mappedApplicants = useMemo(
      () => processStep.applicants.map((applicant) => applicant.id),
      [processStep.applicants],
   );

   function getApplicants(everyone: boolean, applicants: Array<number>) {
      if (everyone) {
         return [allApplicants, []];
      }

      const newApplicants = applicants.filter(
         (id) => !mappedApplicants.some((prevId) => prevId === id),
      );
      const removedApplicants = mappedApplicants.filter(
         (id) => !applicants.some((prevId) => prevId === id),
      );

      return [newApplicants, removedApplicants];
   }

   const formik = useFormik({
      initialValues: {
         title: processStep.title,
         description: processStep.description,
         deadline: processStep.deadline,
         onlyOnDeadline: processStep.onlyOnDeadline,
         everyone: availableApplicants.length === processStep.applicants.length,
         applicants: mappedApplicants,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         const {
            title,
            description,
            deadline,
            onlyOnDeadline,
            everyone,
            applicants,
         } = formik.values;
         const [newApplicants, removedApplicants] = getApplicants(
            everyone,
            applicants,
         );

         updateProcessStep({
            id: processStep.id,
            title,
            description,
            deadline,
            onlyOnDeadline,
            newApplicants,
            removedApplicants,
         })
            .unwrap()
            .then(() => {
               toast.success(t('messages.updated'));
               navigation.goBack();
            });
      },
   });

   const providerValue = useMemo(
      () => ({
         formik,
         isLoading: isUpdating,
      }),
      [formik, isUpdating],
   );

   return (
      <View style={styles.container}>
         <ProcessStepFormContext.Provider value={providerValue}>
            <ProcessStepForm availableApplicants={availableApplicants} />
         </ProcessStepFormContext.Provider>
      </View>
   );
}
