import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Text } from 'react-native-paper';

import useOpportunityForm from '@/hooks/useOpportunityForm';
import Gap from '@/components/atoms/Gap';
import Button from '@/components/atoms/Button';
import TextInputField from '@/components/molecules/TextInputField';
import PageHeader from '@/components/molecules/PageHeader';
import MaskedField from '@/components/atoms/MaskedField';
import Select from '@/components/atoms/Select';
import DateField from '@/components/molecules/DateField';
import styles from './styles';

export default function OpportunityForm() {
   const { t } = useTranslation(['opportunities', 'common']);

   const { formik, isLoading } = useOpportunityForm();
   const {
      title,
      description,
      type,
      salary,
      deadline,
      weeklyWorkload,
      isActive,
   } = formik.values;
   const { errors } = formik;

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

   function renderFields() {
      return (
         <>
            <View style={styles.isActive}>
               <Text>{t('labels.active')}</Text>
               <Checkbox
                  status={isActive ? 'checked' : 'unchecked'}
                  onPress={() => formik.setFieldValue('isActive', !isActive)}
               />
            </View>
            <TextInputField
               multiline
               numberOfLines={6}
               label={t('labels.description')}
               value={description}
               placeholder={t('placeholders.description')}
               onChangeText={(value) =>
                  formik.setFieldValue('description', value)
               }
               onBlur={formik.handleBlur('description')}
               hasError={
                  Boolean(errors.description) && formik.touched.description
               }
               error={errors.description}
            />
            <MaskedField
               type="money"
               label={t('labels.salary')}
               value={String(salary)}
               onChange={(value) => formik.setFieldValue('salary', value)}
               onBlur={formik.handleBlur('salary')}
               hasError={Boolean(errors.salary) && formik.touched.salary}
               error={errors.salary}
            />
            <Select
               label={t('labels.select.type')}
               value={type}
               items={[
                  {
                     label: t('labels.remote', { ns: 'common' }),
                     value: 'REMOTE',
                  },
                  {
                     label: t('labels.local', { ns: 'common' }),
                     value: 'LOCAL',
                  },
               ]}
               onValueChange={(value) => formik.setFieldValue('type', value)}
            />
            <TextInputField
               inputMode="numeric"
               label={t('labels.workload.form')}
               value={String(weeklyWorkload)}
               placeholder={t('placeholders.workload')}
               onChangeText={(value) =>
                  formik.setFieldValue('weeklyWorkload', value)
               }
               onBlur={formik.handleBlur('weeklyWorkload')}
               hasError={
                  Boolean(errors.weeklyWorkload) &&
                  formik.touched.weeklyWorkload
               }
               error={errors.weeklyWorkload}
            />
            <DateField
               label={t('labels.deadline')}
               placeholder="13/08/2024"
               date={deadline}
               onChange={(newDate) => formik.setFieldValue('deadline', newDate)}
               onBlur={formik.handleBlur('deadline')}
               hasError={Boolean(errors.deadline) && formik.touched.deadline}
               error={errors.deadline}
            />
         </>
      );
   }

   return (
      <>
         <PageHeader hasBackButton withTitle={false}>
            <TextInputField
               style={styles.titleInput}
               label={t('labels.title')}
               value={title}
               placeholder={t('placeholders.title')}
               onChangeText={(value) => formik.setFieldValue('title', value)}
               onBlur={formik.handleBlur('title')}
               hasError={Boolean(errors.title) && formik.touched.title}
               error={errors.title}
            />
         </PageHeader>
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
