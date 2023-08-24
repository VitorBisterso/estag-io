import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { GetReviewsResponse } from '@/models/reviews';
import PageHeader from '@/components/molecules/PageHeader';
import Gap from '@/components/atoms/Gap';
import { COMPANY_REVIEWS_ICON } from '@/consts';
import ReviewFilter from '@/components/organisms/ReviewFilter';
import ReviewsList from '@/components/organisms/ReviewsList';
import styles from './styles';

interface Props {
   data: GetReviewsResponse;
   isFetching: boolean;
}

export default function ReviewsTemplate({ data, isFetching }: Props) {
   const { t } = useTranslation('reviews');

   return (
      <>
         <PageHeader
            title={t('company.header.title')}
            icon={COMPANY_REVIEWS_ICON}
         />
         <ScrollView style={styles.container}>
            <Gap gap={32} style={styles.content}>
               <View />
               <ReviewFilter />
               <ReviewsList
                  reviews={data?.list ?? []}
                  count={data?.count ?? 0}
                  isLoading={isFetching}
               />
            </Gap>
         </ScrollView>
      </>
   );
}
