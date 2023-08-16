import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RadioButton, Switch, Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useProcessStepForm from '@/hooks/useProcessStepForm';
import Gap from '@/components/atoms/Gap';
import MultiSelect from '@/components/atoms/MultiSelect';
import Button from '@/components/atoms/Button';
import TextInputField from '@/components/molecules/TextInputField';
import DateField from '@/components/molecules/DateField';
import PageHeader from '@/components/molecules/PageHeader';
import { Applicant } from '@/models/processSteps';
import styles from './styles';

interface Props {
   availableApplicants: Array<Applicant>;
}

export default function ProcessStepForm({ availableApplicants }: Props) {
   const { t } = useTranslation(['processSteps', 'common']);

   const { formik, isLoading } = useProcessStepForm();
   const {
      title,
      description,
      deadline,
      onlyOnDeadline,
      everyone,
      applicants,
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

   function renderMultiSelect() {
      if (everyone) return null;

      return (
         <View style={styles.multiselect}>
            <MultiSelect
               items={availableApplicants}
               onChange={(ids: Array<number>) => {
                  formik.setFieldValue('applicants', ids);
               }}
               selectedItems={applicants}
               placeholder={t('placeholders.applicants')}
               noItemsText={t('labels.applicants.multiselect.no.items')}
            />
         </View>
      );
   }

   function renderFields() {
      return (
         <>
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
            <DateField
               label={t('labels.deadline')}
               placeholder="13/08/2024"
               date={deadline}
               onChange={(newDate) => formik.setFieldValue('deadline', newDate)}
               onBlur={formik.handleBlur('deadline')}
               hasError={Boolean(errors.deadline) && formik.touched.deadline}
               error={errors.deadline}
            />
            <RadioButton.Group
               onValueChange={(newValue) => {
                  const value = newValue === 'onlyOnDeadline';
                  formik.setFieldValue('onlyOnDeadline', value);
               }}
               value={onlyOnDeadline ? 'onlyOnDeadline' : 'until'}
            >
               <View style={styles.row}>
                  <View style={styles.radio}>
                     <Text style={styles.radioText}>
                        {t('labels.radio.deadline.only')}
                     </Text>
                     <RadioButton value="onlyOnDeadline" />
                  </View>
                  <View style={styles.radio}>
                     <Text style={styles.radioText}>
                        {t('labels.radio.deadline.until')}
                     </Text>
                     <RadioButton value="until" />
                  </View>
               </View>
            </RadioButton.Group>
            <View style={[styles.row, styles.everyone]}>
               <Text>{t('labels.everyone')}</Text>
               <Switch
                  value={everyone}
                  onValueChange={() => {
                     formik.setFieldValue('everyone', !everyone);
                  }}
               />
            </View>
            {renderMultiSelect()}
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
