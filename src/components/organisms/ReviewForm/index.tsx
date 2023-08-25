import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Rating } from 'react-native-ratings';
import { Text } from 'react-native-paper';

import Gap from '@/components/atoms/Gap';
import Button from '@/components/atoms/Button';
import TextInputField from '@/components/molecules/TextInputField';
import PageHeader from '@/components/molecules/PageHeader';
import useReviewForm from '@/hooks/useReviewForm';
import styles from './styles';

export default function ReviewForm() {
   const { t } = useTranslation('reviews');

   const { formik, isLoading } = useReviewForm();
   const { description, rating } = formik.values;
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
            <View style={styles.rating}>
               <Text style={styles.ratingLabel}>{t('labels.rating')}</Text>
               <Rating
                  startingValue={rating}
                  onFinishRating={(newRating: number) => {
                     formik.setFieldValue('rating', newRating);
                  }}
                  imageSize={32}
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
         </>
      );
   }

   return (
      <>
         <PageHeader hasBackButton title={t('labels.create')} />
         <ScrollView style={styles.container}>
            <KeyboardAwareScrollView>
               <Gap gap={16}>
                  {renderFields()}
                  <Button
                     label={t('buttons.post.review')}
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
