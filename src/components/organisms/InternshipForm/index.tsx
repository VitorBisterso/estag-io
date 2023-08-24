import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Gap from '@/components/atoms/Gap';
import Button from '@/components/atoms/Button';
import TextInputField from '@/components/molecules/TextInputField';
import PageHeader from '@/components/molecules/PageHeader';
import Select from '@/components/atoms/Select';
import DateField from '@/components/molecules/DateField';
import useInternshipForm from '@/hooks/useInternshipForm';
import styles from './styles';

interface Props {
   isUpdating?: boolean;
}

export default function InternshipForm({ isUpdating }: Props) {
   const { t } = useTranslation(['internships', 'common']);

   const { formik, opportunities, isLoading } = useInternshipForm();
   const { managerName, advisorName, jobId, studentId, initialDate, until } =
      formik.values;
   const { errors } = formik;

   const selectedOpportunity = useMemo(
      () => opportunities.find((opportunity) => opportunity.id === jobId),
      [opportunities, jobId],
   );
   const selectedStudent = useMemo(
      () =>
         selectedOpportunity?.applicants?.find(
            (applicant) => applicant.id === studentId,
         ),
      [opportunities, studentId],
   );

   const mappedOpportunities = useMemo(
      () =>
         opportunities?.map((opportunity) => ({
            label: opportunity.title,
            value: opportunity.id,
         })),
      [opportunities],
   );
   const mappedStudents = useMemo(
      () =>
         selectedOpportunity?.applicants?.map((applicant) => ({
            label: applicant.name,
            value: applicant.id,
         })),
      [opportunities, selectedOpportunity],
   );

   function shouldDisableButton() {
      const hasEmptyValue = Object.keys(formik.values).some(
         (key) =>
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === '' ||
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === null ||
            // @ts-expect-error string is different from keyof OpportunityFormValues
            formik.values[key] === undefined,
      );
      if (hasEmptyValue) return true;

      const hasError = Object.keys(errors).some(
         // @ts-expect-error string is different from keyof OpportunityFormValues
         (key) => !!errors[key],
      );
      if (hasError) return true;

      return false;
   }

   function renderPageHeader() {
      if (isUpdating)
         return <PageHeader hasBackButton title={selectedStudent?.name} />;

      return <PageHeader hasBackButton title={t('labels.create')} />;
   }

   function renderFields() {
      return (
         <>
            <Select
               label={t('labels.opportunity')}
               value={jobId}
               items={mappedOpportunities}
               onValueChange={(value) => formik.setFieldValue('jobId', value)}
            />
            {!isUpdating && (
               <Select
                  label={t('labels.intern')}
                  value={studentId}
                  items={mappedStudents ?? []}
                  onValueChange={(value) =>
                     formik.setFieldValue('studentId', value)
                  }
               />
            )}
            <TextInputField
               label={t('labels.manager')}
               value={managerName}
               placeholder={t('placeholders.manager')}
               onChangeText={(value) =>
                  formik.setFieldValue('managerName', value)
               }
               onBlur={formik.handleBlur('managerName')}
               hasError={
                  Boolean(errors.managerName) && formik.touched.managerName
               }
               error={errors.managerName}
            />
            <TextInputField
               label={t('labels.advisor')}
               value={advisorName}
               placeholder={t('placeholders.advisor')}
               onChangeText={(value) =>
                  formik.setFieldValue('advisorName', value)
               }
               onBlur={formik.handleBlur('advisorName')}
               hasError={
                  Boolean(errors.advisorName) && formik.touched.advisorName
               }
               error={errors.advisorName}
            />
            <DateField
               label={t('labels.initial.date')}
               placeholder="13/08/2024"
               date={initialDate}
               onChange={(newDate) =>
                  formik.setFieldValue('initialDate', newDate)
               }
               onBlur={formik.handleBlur('initialDate')}
               hasError={
                  Boolean(errors.initialDate) && formik.touched.initialDate
               }
               error={errors.initialDate}
            />
            <DateField
               label={t('labels.until')}
               placeholder="02/02/2025"
               date={until}
               onChange={(newDate) => formik.setFieldValue('until', newDate)}
               onBlur={formik.handleBlur('until')}
               hasError={Boolean(errors.until) && formik.touched.until}
               error={errors.until}
            />
         </>
      );
   }

   return (
      <>
         {renderPageHeader()}
         <ScrollView style={styles.container}>
            <KeyboardAwareScrollView>
               <Gap gap={16}>
                  {renderFields()}
                  <Button
                     label={t('buttons.save', { ns: 'common' })}
                     onPress={formik.handleSubmit}
                     style={styles.button}
                     disabled={shouldDisableButton()}
                     loading={isLoading}
                  />
               </Gap>
            </KeyboardAwareScrollView>
         </ScrollView>
      </>
   );
}

InternshipForm.defaultProps = {
   isUpdating: false,
};
