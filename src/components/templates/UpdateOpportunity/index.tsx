import { View } from 'react-native';
import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { useUpdateOpportunityMutation } from '@/services';
import { OpportunityFormContext } from '@/hooks/useOpportunityForm';
import { Opportunity } from '@/models/opportunities';
import { OPPORTUNITIES_PAGE } from '@/consts';
import OpportunityForm from '@/components/organisms/OpportunityForm';
import validations from './validations';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

export default function UpdateOpportunityTemplate({ opportunity }: Props) {
   const { t } = useTranslation('opportunities');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [updateOpportunity, { isLoading: isUpdating }] =
      useUpdateOpportunityMutation();

   const formik = useFormik({
      initialValues: {
         title: opportunity.title,
         description: opportunity.description,
         type: opportunity.type,
         salary: String(opportunity.salary),
         deadline: opportunity.deadline,
         weeklyWorkload: opportunity.weeklyWorkload,
         isActive: Boolean(opportunity.isActive),
      },
      validationSchema: validations(t),
      onSubmit: () => {
         const { salary: maskedSalary, weeklyWorkload: workload } =
            formik.values;

         const salary = maskedSalary
            .slice(3)
            .replaceAll('.', '')
            .replaceAll(',', '.');
         const weeklyWorkload = Number(workload);

         updateOpportunity({
            ...formik.values,
            id: opportunity.id,
            salary: Number(salary),
            weeklyWorkload,
         })
            .unwrap()
            .then(() => {
               toast.success(t('messages.updated'));
               navigation.navigate(OPPORTUNITIES_PAGE);
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
         <OpportunityFormContext.Provider value={providerValue}>
            <OpportunityForm isUpdating />
         </OpportunityFormContext.Provider>
      </View>
   );
}
