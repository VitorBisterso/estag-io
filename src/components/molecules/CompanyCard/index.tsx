import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { Masks, formatWithMask } from 'react-native-mask-input';

import { Company } from '@/models/reviews';
import Gap from '@/components/atoms/Gap';
import { useMemo } from 'react';
import Button from '@/components/atoms/Button';
import { COMPANY_DETAILS_PAGE, CREATE_REVIEW_PAGE } from '@/consts';
import Card from '../Card';
import styles from './styles';

interface Props {
   company: Company;
}

export default function CompanyCard({ company }: Props) {
   const navigation = useNavigation<any>();
   const { t } = useTranslation(['reviews', 'businessCategories']);

   const maskedPhone = useMemo(
      () =>
         formatWithMask({
            mask: Masks.BRL_PHONE,
            text: company.phone,
         }).masked,
      [company.phone],
   );
   return (
      <Card
         title={company.name}
         titleStyle={styles.title}
         onPress={() =>
            navigation.navigate(COMPANY_DETAILS_PAGE, { id: company.id })
         }
      >
         <Gap gap={8} style={styles.content}>
            <Text style={[styles.text, styles.italic]}>
               {t(`${company.businessCategory}`, { ns: 'businessCategories' })}
            </Text>
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
               onPress={() =>
                  navigation.navigate(CREATE_REVIEW_PAGE, {
                     companyId: company.id,
                  })
               }
            />
         </Gap>
      </Card>
   );
}
