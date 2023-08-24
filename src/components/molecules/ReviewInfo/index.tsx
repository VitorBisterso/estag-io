import { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';

import { Review } from '@/models/reviews';
import { formatDate, getRandomName } from '@/utils';
import styles from './styles';

interface Props {
   review: Review;
}

export default function ReviewInfo({ review }: Props) {
   const { t } = useTranslation('reviews');

   const { description, rating, createdAt } = review;

   const formattedDate = useMemo(
      () => formatDate(createdAt),
      [review.createdAt],
   );
   const randomName = getRandomName(t('labels.student.name'));
   return (
      <>
         <Text style={styles.title}>{randomName}</Text>
         <View style={styles.row}>
            <Rating
               readonly
               startingValue={rating}
               showReadOnlyText={false}
               imageSize={20}
            />
            <Text style={styles.date}>{formattedDate}</Text>
         </View>
         <Text style={styles.description} numberOfLines={5}>
            {description}
         </Text>
      </>
   );
}
