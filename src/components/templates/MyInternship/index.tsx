import { useMemo } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Internship } from '@/models/internships';
import PageHeader from '@/components/molecules/PageHeader';
import InternshipDetails from '@/components/molecules/InternshipDetails';
import { INTERNSHIPS_ICON } from '@/consts';
import styles from './styles';

interface Props {
   internship?: Internship;
}

export default function MyInternshipTemplate({ internship }: Props) {
   const theme = useTheme();
   const { t } = useTranslation('internships');

   const isEmpty = useMemo(
      () => Object.keys(internship ?? {}).length <= 0,
      [internship],
   );

   function renderContent() {
      if (isEmpty)
         return (
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>{t('student.labels.empty')}</Text>
               <IconButton
                  icon="account-off-outline"
                  iconColor={theme.colors.primary}
                  size={96}
               />
            </View>
         );

      return (
         <InternshipDetails internship={internship ?? ({} as Internship)} />
      );
   }

   return (
      <View style={styles.wrapper}>
         <PageHeader
            title={t('student.header.title')}
            icon={INTERNSHIPS_ICON}
         />
         <View style={styles.container}>{renderContent()}</View>
      </View>
   );
}

MyInternshipTemplate.defaultProps = {
   internship: {},
};
