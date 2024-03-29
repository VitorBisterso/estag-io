import { useMemo } from 'react';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Gap from '@/components/atoms/Gap';
import { Opportunity } from '@/models/opportunities';
import { formatDate, intlCurrencyFormatter } from '@/utils';
import { RootState } from '@/store';
import { LOCAL_ICON, REMOTE_ICON } from '@/consts';
import DetailsItem from '@/components/atoms/DetailsItem';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

export default function OpportunityDetailsInfo({ opportunity }: Props) {
   const { t } = useTranslation(['opportunities', 'common']);
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const isCompany = profile === 'COMPANY';

   const {
      description,
      salary,
      type,
      deadline,
      weeklyWorkload,
      isActive,
      companyName,
   } = opportunity;

   const currencyFormatter = useMemo(intlCurrencyFormatter, []);
   return (
      <Gap gap={16}>
         <Text style={styles.descriptionTitle}>{t('labels.description')}</Text>
         <Text style={styles.description}>{description}</Text>
         {!isCompany && (
            <DetailsItem
               label={t('labels.company')}
               value={companyName as string}
            />
         )}
         <DetailsItem
            label={t('labels.salary')}
            value={currencyFormatter.format(salary)}
         />
         <DetailsItem
            style={{ marginVertical: -16 }}
            label={t('labels.type')}
            value={t(`labels.${type.toLowerCase()}`, { ns: 'common' })}
            valueIcon={type === 'REMOTE' ? REMOTE_ICON : LOCAL_ICON}
         />
         <DetailsItem
            label={t('labels.workload')}
            value={`${weeklyWorkload}h`}
         />
         <DetailsItem
            label={t('labels.deadline')}
            value={formatDate(deadline)}
            valueColor="red"
         />
         {isCompany && (
            <DetailsItem
               style={{ marginTop: -8 }}
               label={t('labels.active')}
               value=""
               hasCheckbox
               checkboxValue={isActive}
            />
         )}
      </Gap>
   );
}
