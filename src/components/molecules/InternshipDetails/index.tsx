import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Internship } from '@/models/internships';
import Gap from '@/components/atoms/Gap';
import DetailsItem from '@/components/atoms/DetailsItem';
import { LOCAL_ICON, REMOTE_ICON } from '@/consts';
import { formatDate, intlCurrencyFormatter } from '@/utils';
import styles from './styles';

interface Props {
   internship: Internship;
}

export default function InternshipDetails({ internship }: Props) {
   const { t } = useTranslation(['internships', 'common']);

   const currencyFormatter = useMemo(intlCurrencyFormatter, []);
   return (
      <Gap gap={16} style={styles.container}>
         <DetailsItem label={t('labels.role')} value={internship.job.title} />
         <DetailsItem
            label={t('labels.manager')}
            value={internship.managerName}
         />
         <DetailsItem
            label={t('labels.salary')}
            value={currencyFormatter.format(internship.job.salary)}
         />
         <DetailsItem
            label={t('labels.type')}
            style={styles.internshipType}
            value={t(`labels.${internship.job.type.toLowerCase()}`, {
               ns: 'common',
            })}
            valueIcon={
               internship.job.type === 'LOCAL' ? LOCAL_ICON : REMOTE_ICON
            }
         />
         <DetailsItem
            label={t('labels.workload')}
            value={`${internship.job.weeklyWorkload}h`}
         />
         <DetailsItem
            label={t('labels.initial.date')}
            value={formatDate(internship.initialDate)}
         />
         <DetailsItem
            label={t('labels.until')}
            value={formatDate(internship.until)}
            valueColor="red"
         />
      </Gap>
   );
}
