import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { INTERNSHIPS_PAGE } from '@/consts';
import validations from '@/hooks/useInternshipForm/validations';
import { Internship } from '@/models/internships';
import { useUpdateInternshipMutation } from '@/services/internships';
import { InternshipFormContext } from '@/hooks/useInternshipForm';
import { SimplifiedOpportunity } from '@/models/opportunities';
import InternshipForm from '@/components/organisms/InternshipForm';
import styles from './styles';

interface Props {
   internship: Internship;
   opportunities: Array<SimplifiedOpportunity>;
}

export default function UpdateInternshipTemplate({
   internship,
   opportunities,
}: Props) {
   const { t } = useTranslation('internships');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [updateInternship, { isLoading: isUpdating }] =
      useUpdateInternshipMutation();

   const { id, initialDate, until, managerName, advisorName, student, job } =
      internship;
   const formik = useFormik({
      initialValues: {
         initialDate,
         until,
         managerName,
         advisorName,
         studentId: Number(student?.id),
         jobId: job.id,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         updateInternship({
            ...formik.values,
            id,
         })
            .unwrap()
            .then(() => {
               toast.success(t('messages.updated'));
               navigation.navigate(INTERNSHIPS_PAGE);
            });
      },
   });

   const providerValue = useMemo(
      () => ({
         formik,
         isLoading: isUpdating,
         opportunities,
      }),
      [formik, isUpdating],
   );

   return (
      <View style={styles.container}>
         <InternshipFormContext.Provider value={providerValue}>
            <InternshipForm isUpdating />
         </InternshipFormContext.Provider>
      </View>
   );
}
