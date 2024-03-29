import { useMemo } from 'react';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Masks, formatWithMask } from 'react-native-mask-input';
import { useNavigation } from '@react-navigation/native';

import { Company } from '@/models/reviews';
import PageHeader from '@/components/molecules/PageHeader';
import Gap from '@/components/atoms/Gap';
import DetailsItem from '@/components/atoms/DetailsItem';
import Button from '@/components/atoms/Button';
import ReviewsList from '@/components/organisms/ReviewsList';
import { CREATE_REVIEW_PAGE } from '@/consts';
import styles from './styles';

interface Props {
   company: Company;
}

export default function CompanyDetailsTemplate({ company }: Props) {
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
      <ScrollView style={styles.container}>
         <PageHeader title={company.name} hasBackButton />
         <Gap gap={24} style={styles.content}>
            <Gap gap={16}>
               <DetailsItem
                  label={t('labels.business.category')}
                  value={t(`${company.businessCategory}`, {
                     ns: 'businessCategories',
                  })}
               />
               <DetailsItem label={t('labels.phone')} value={maskedPhone} />
               <DetailsItem
                  label={t('labels.rating.average')}
                  value={Number(company.rating).toFixed(2)}
               />
               <DetailsItem
                  label={t('labels.rating.count')}
                  value={company.reviewCount ?? 0}
               />
            </Gap>
            <Button
               label={t('buttons.post.review')}
               onPress={() =>
                  navigation.navigate(CREATE_REVIEW_PAGE, {
                     companyId: company.id,
                  })
               }
            />
            <Text style={styles.recentLabel}>{t('labels.recent.reviews')}</Text>
            <ReviewsList
               reviews={company.reviews ?? []}
               withPagination={false}
            />
         </Gap>
      </ScrollView>
   );
}
