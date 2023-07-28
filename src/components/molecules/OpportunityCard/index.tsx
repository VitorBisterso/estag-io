import { useMemo } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { IconButton, Switch, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/store';
import { Opportunity } from '@/models/opportunities';
import { formatDate } from '@/utils';
import CardItem from '@/components/atoms/CardItem';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
   companyName: string;
}

type CompanyStyles = {
   title?: StyleProp<TextStyle>;
   header?: StyleProp<ViewStyle>;
   border?: StyleProp<ViewStyle>;
};

export default function OpportunityCard({ opportunity, companyName }: Props) {
   const { t } = useTranslation('opportunities');
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);

   const {
      title,
      description,
      salary,
      type,
      deadline,
      weeklyWorkload,
      isActive,
   } = opportunity;

   const isCompany = profile === 'COMPANY';
   function getCompanyStyles(): CompanyStyles {
      if (!isCompany) return {};

      return {
         title: styles.companyTitle,
         header: styles.companyHeader,
         border: { borderStyle: isActive ? 'solid' : 'dashed' },
      };
   }
   const companyStyles: CompanyStyles = useMemo(getCompanyStyles, [profile]);

   function renderIcons() {
      if (!isCompany) return null;

      return (
         <View style={styles.icons}>
            <IconButton
               style={styles.iconButton}
               icon="pencil"
               iconColor="black"
            />
            <IconButton
               style={styles.iconButton}
               icon="delete"
               iconColor="red"
            />
         </View>
      );
   }

   function renderActiveToggle() {
      if (!isCompany) return null;

      return (
         <Switch
            style={styles.activeSwitch}
            value={isActive}
            // eslint-disable-next-line no-console
            onValueChange={() => console.log('toggle active')}
         />
      );
   }

   return (
      <View style={[styles.container, styles.shadow, companyStyles.border]}>
         <View style={companyStyles.header}>
            <Text style={[styles.title, companyStyles.title]} numberOfLines={1}>
               {title}
            </Text>
            {renderIcons()}
         </View>
         <View style={[styles.row, styles.subtitle]}>
            <Text style={styles.subtitleText} numberOfLines={1}>
               {companyName}
            </Text>
            <Text style={styles.subtitleText} numberOfLines={1}>
               {t('labels.card.deadline', { date: formatDate(deadline) })}
            </Text>
         </View>
         <Text style={styles.description} numberOfLines={2}>
            {description}
         </Text>
         <View style={styles.row}>
            <CardItem icon="currency-usd" text={salary.toString()} />
            <CardItem
               icon={type === 'REMOTE' ? 'laptop' : 'domain'}
               text={t(`filters.type.${type.toLowerCase()}`)}
            />
            <CardItem
               icon="clock-time-eight-outline"
               text={`${weeklyWorkload.toString()}h`}
            />
         </View>
         {renderActiveToggle()}
      </View>
   );
}
