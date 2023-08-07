/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useCreateOpportunity from '@/hooks/useCreateOpportunity';
import Gap from '@/components/atoms/Gap';
import Button from '@/components/atoms/Button';
import TextInputField from '@/components/molecules/TextInputField';
import PageHeader from '@/components/molecules/PageHeader';
import styles from './styles';

export default function CreateOpportunityForm() {
   const { t } = useTranslation(['opportunities', 'common']);

   const { formik, isLoading } = useCreateOpportunity();
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
         // @ts-expect-error string is different from keyof CreateOpportunityValues
         (key) => !formik.values[key],
      );
      if (hasEmptyValue) return true;

      const hasError = Object.keys(errors).some(
         // @ts-expect-error string is different from keyof CreateOpportunityValues
         (key) => !!errors[key],
      );
      if (hasError) return true;

      return false;
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
            <View />
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
