import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { INTERNSHIPS_ICON } from '@/consts';
import Gap from '@/components/atoms/Gap';
import Fab from '@/components/atoms/Fab';
import PageHeader from '@/components/molecules/PageHeader';
import InternshipsList from '@/components/organisms/InternshipsList';
import InternshipFilter from '@/components/organisms/InternshipFilter';
import { GetInternshipsResponse } from '@/models/internships';
import styles from './styles';

interface Props {
   data: GetInternshipsResponse;
   isFetching: boolean;
}

export default function InternshipsListTemplate({ data, isFetching }: Props) {
   const { t } = useTranslation('internships');

   return (
      <>
         <PageHeader
            title={t('company.header.title')}
            icon={INTERNSHIPS_ICON}
         />
         <ScrollView style={styles.container}>
            <Gap gap={32} style={styles.content}>
               <InternshipFilter />
               <InternshipsList
                  internships={data.list ?? []}
                  count={data?.count || 0}
                  isLoading={isFetching}
               />
            </Gap>
         </ScrollView>
         {/* eslint-disable-next-line no-console */}
         <Fab icon="plus" onPress={() => console.log('navigate')} />
      </>
   );
}
