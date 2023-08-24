import { useCallback } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Internship } from '@/models/internships';
import { formatDate } from '@/utils';
import Gap from '@/components/atoms/Gap';
import CardBottomInfo from '@/components/atoms/CardBottomInfo';
import Card from '../Card';
import styles from './styles';

interface Props {
   internship: Internship;
   onPress: () => void;
}

export default function InternshipCard({ internship, onPress }: Props) {
   const { t } = useTranslation('internships');

   const renderIcon = useCallback(
      () => (
         <View style={styles.icon}>
            <IconButton icon="pencil" iconColor="black" />
         </View>
      ),
      [],
   );

   return (
      <Card
         title={internship.student?.name ?? ''}
         titleStyle={styles.title}
         headerStyle={styles.header}
         renderIcons={renderIcon}
         onPress={onPress}
      >
         <Gap gap={16} style={styles.cardContent}>
            <View>
               <Text style={styles.grayText} numberOfLines={1}>
                  {internship.job.title}
               </Text>
               <Text style={styles.grayText} numberOfLines={1}>
                  {`${formatDate(internship.initialDate)} - ${formatDate(
                     internship.until,
                  )}`}
               </Text>
            </View>
            <View>
               <View style={styles.row}>
                  <Text style={styles.grayText}>{`${t(
                     'labels.manager',
                  )}: `}</Text>
                  <Text style={[styles.grayText, styles.bold]}>
                     {internship.managerName}
                  </Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.grayText}>{`${t(
                     'labels.advisor',
                  )}: `}</Text>
                  <Text style={[styles.grayText, styles.bold]}>
                     {internship.advisorName}
                  </Text>
               </View>
            </View>
            <CardBottomInfo
               salary={internship.job.salary}
               type={internship.job.type}
               workload={internship.job.weeklyWorkload}
            />
         </Gap>
      </Card>
   );
}
