import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Route, useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { COMPANIES_PAGE } from '@/consts';
import validations from '@/hooks/useReviewForm/validations';
import { useCreateReviewMutation } from '@/services';
import { ReviewFormContext } from '@/hooks/useReviewForm';
import CreateReviewTemplate from '@/components/templates/CreateReview';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { companyId: number }>;
}

export default function CreateReviewPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { companyId } = route!.params;

   const { t } = useTranslation(['reviews', 'common']);
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();

   const formik = useFormik({
      initialValues: {
         rating: 0,
         description: '',
      },
      validationSchema: validations(t),
      onSubmit: () => {
         createReview({ ...formik.values, companyId })
            .unwrap()
            .then(() => {
               toast.success(
                  t('success.created', {
                     ns: 'common',
                     object: t('labels.rating'),
                  }),
               );
               navigation.replace(COMPANIES_PAGE);
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
      <ReviewFormContext.Provider value={providerValue}>
         <CreateReviewTemplate />
      </ReviewFormContext.Provider>
   );
}
