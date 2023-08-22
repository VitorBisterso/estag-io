import { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { intlCurrencyFormatter } from '@/utils';
import { LOCAL_ICON, REMOTE_ICON } from '@/consts';
import { OPPORTUNITY_TYPE } from '@/models/opportunities';
import CardItem from '../CardItem';
import styles from './styles';

interface Props {
   salary: number;
   type: OPPORTUNITY_TYPE;
   workload: number;
}

export default function CardBottomInfo({ salary, type, workload }: Props) {
   const { t } = useTranslation('common');

   const currencyFormatter = useMemo(intlCurrencyFormatter, []);

   return (
      <View style={styles.row}>
         <CardItem
            icon="currency-usd"
            text={currencyFormatter.format(salary)}
            style={styles.currency}
         />
         <CardItem
            icon={type === 'REMOTE' ? REMOTE_ICON : LOCAL_ICON}
            text={t(`labels.${type.toLowerCase()}`)}
         />
         <CardItem
            icon="clock-time-eight-outline"
            text={`${workload.toString()}h`}
         />
      </View>
   );
}
