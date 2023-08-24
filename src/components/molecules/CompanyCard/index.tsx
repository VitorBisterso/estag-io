import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Rating } from 'react-native-ratings';

import { Company } from '@/models/reviews';
import Gap from '@/components/atoms/Gap';
import { Masks, formatWithMask } from 'react-native-mask-input';
import { useMemo } from 'react';
import Button from '@/components/atoms/Button';
import Card from '../Card';
import styles from './styles';

interface Props {
   company: Company;
}

export default function CompanyCard({ company }: Props) {
   const { t } = useTranslation('reviews');

   const maskedPhone = useMemo(
      () =>
         formatWithMask({
            mask: Masks.BRL_PHONE,
            text: company.phone,
         }).masked,
      [company.phone],
   );
   return (
      <Card title={company.name} titleStyle={styles.title}>
         <Gap gap={8} style={styles.content}>
            <Text style={styles.text}>{`${t(
               'labels.phone',
            )}: ${maskedPhone}`}</Text>
            <View style={styles.row}>
               <Text style={styles.text}>{`${t('labels.rating')}: `}</Text>
               <Rating
                  readonly
                  style={styles.rating}
                  fractions={10}
                  startingValue={company.rating}
                  showReadOnlyText={false}
                  imageSize={20}
               />
            </View>
            <Button
               style={styles.button}
               textStyle={styles.buttonText}
               label={t('buttons.post.review')}
               onPress={() => undefined}
            />
         </Gap>
      </Card>
   );
}
