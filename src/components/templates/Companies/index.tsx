import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { GetCompaniesResponse } from '@/models/reviews';
import PageHeader from '@/components/molecules/PageHeader';
import Gap from '@/components/atoms/Gap';
import { USER_REVIEWS_ICON } from '@/consts';
import CompanyFilter from '@/components/organisms/CompanyFilter';
import CompaniesList from '@/components/organisms/CompaniesList';
import styles from './styles';

interface Props {
   data: GetCompaniesResponse;
   isFetching: boolean;
}

export default function CompaniesTemplate({ data, isFetching }: Props) {
   const { t } = useTranslation('reviews');

   return (
      <>
         <PageHeader
            title={t('student.header.title')}
            icon={USER_REVIEWS_ICON}
         />
         <ScrollView style={styles.container}>
            <Gap gap={32} style={styles.content}>
               <CompanyFilter />
               <CompaniesList
                  companies={data?.list ?? []}
                  count={data?.count ?? 0}
                  isLoading={isFetching}
               />
            </Gap>
         </ScrollView>
      </>
   );
}
