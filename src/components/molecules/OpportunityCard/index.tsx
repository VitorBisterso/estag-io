import { useMemo } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { IconButton, Switch, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '@/store';
import { useUpdateOpportunityMutation } from '@/services';
import { Opportunity } from '@/models/opportunities';
import { formatDate } from '@/utils';
import CardItem from '@/components/atoms/CardItem';
import Card from '@/components/molecules/Card';
import { LOCAL_ICON, OPPORTUNITY_DETAILS_PAGE, REMOTE_ICON } from '@/consts';
import useToast from '@/hooks/useToast';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

type CompanyStyles = {
   title?: StyleProp<TextStyle>;
   header?: StyleProp<ViewStyle>;
   border?: ViewStyle['borderStyle'];
};

export default function OpportunityCard({ opportunity }: Props) {
   const { t } = useTranslation('opportunities');
   const navigation = useNavigation<any>();
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const toast = useToast();

   const [updateOpportunity, { isLoading: isUpdating }] =
      useUpdateOpportunityMutation();

   const {
      id,
      title,
      description,
      salary,
      companyName,
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
         border: isActive ? 'solid' : 'dashed',
      };
   }
   const companyStyles: CompanyStyles = useMemo(getCompanyStyles, [
      profile,
      opportunity,
   ]);

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
            disabled={isUpdating}
            onValueChange={() => {
               const newValue = !isActive;
               updateOpportunity({ ...opportunity, isActive: newValue })
                  .unwrap()
                  .then(() =>
                     toast.success(
                        newValue
                           ? t('messages.activated')
                           : t('messages.inactivated'),
                     ),
                  );
            }}
         />
      );
   }

   return (
      <Card
         title={title}
         border={companyStyles.border}
         titleStyle={companyStyles.title}
         headerStyle={companyStyles.header}
         renderIcons={renderIcons}
         onPress={() => navigation.navigate(OPPORTUNITY_DETAILS_PAGE, { id })}
      >
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
               icon={type === 'REMOTE' ? REMOTE_ICON : LOCAL_ICON}
               text={t(`filters.type.${type.toLowerCase()}`)}
            />
            <CardItem
               icon="clock-time-eight-outline"
               text={`${weeklyWorkload.toString()}h`}
            />
         </View>
         {renderActiveToggle()}
      </Card>
   );
}
