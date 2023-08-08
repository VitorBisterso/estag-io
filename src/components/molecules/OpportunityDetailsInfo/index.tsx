import { useMemo } from 'react';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Gap from '@/components/atoms/Gap';
import OpportunityParamInfo from '@/components/atoms/OpportunityParamInfo';
import { Opportunity } from '@/models/opportunities';
import { formatDate } from '@/utils';
import { RootState } from '@/store';
import { LOCAL_ICON, REMOTE_ICON } from '@/consts';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

export default function OpportunityDetailsInfo({ opportunity }: Props) {
   const { t } = useTranslation('opportunities');
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

   const currencyFormatter = useMemo(
      () =>
         new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
      [],
   );
   return (
      <Gap gap={16}>
         <Text style={styles.descriptionTitle}>{t('labels.description')}</Text>
         <Text style={styles.description}>{description}</Text>
         {!isCompany && (
            <OpportunityParamInfo
               label={t('labels.company')}
               value={companyName as string}
            />
         )}
         <OpportunityParamInfo
            label={t('labels.salary')}
            value={currencyFormatter.format(salary)}
         />
         <OpportunityParamInfo
            style={{ marginVertical: -16 }}
            label={t('labels.type')}
            value={t(`labels.type.${type.toLowerCase()}`)}
            valueIcon={type === 'REMOTE' ? REMOTE_ICON : LOCAL_ICON}
         />
         <OpportunityParamInfo
            label={t('labels.workload')}
            value={`${weeklyWorkload}h`}
         />
         <OpportunityParamInfo
            label={t('labels.deadline')}
            value={formatDate(deadline)}
            valueColor="red"
         />
         {isCompany && (
            <OpportunityParamInfo
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
