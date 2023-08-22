import { useMemo, useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { IconButton, Switch, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '@/store';
import {
   useDeleteOpportunityMutation,
   useUpdateOpportunityMutation,
} from '@/services';
import { Opportunity } from '@/models/opportunities';
import { formatDate } from '@/utils';
import Card from '@/components/molecules/Card';
import { OPPORTUNITY_DETAILS_PAGE } from '@/consts';
import useToast from '@/hooks/useToast';
import CardBottomInfo from '@/components/atoms/CardBottomInfo';
import ConfirmationModal from '../ConfirmationModal';
import EditOpportunityMenu from '../EditOpportunityMenu';
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
   const { t } = useTranslation(['opportunities', 'common']);
   const navigation = useNavigation<any>();
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const toast = useToast();

   const [modalVisible, setModalVisible] = useState(false);
   function hideModal() {
      setModalVisible(false);
   }
   function showModal() {
      setModalVisible(true);
   }

   const [deleteOpportunity, { isLoading: isDeleting }] =
      useDeleteOpportunityMutation();
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
            <EditOpportunityMenu opportunityId={id} opportunityTitle={title} />
            <IconButton
               style={styles.iconButton}
               icon="delete"
               iconColor="red"
               onPress={showModal}
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
      <>
         <ConfirmationModal
            visible={modalVisible}
            title={t('labels.deleting.title')}
            description={t('labels.deleting.description', {
               opportunity: title,
            })}
            confirmText={t('buttons.delete')}
            onDismiss={hideModal}
            onCancel={hideModal}
            onConfirm={() => {
               deleteOpportunity(id)
                  .unwrap()
                  .then(() => {
                     toast.success(t('messages.deleted'));
                     hideModal();
                  });
            }}
            isLoading={isDeleting}
         />
         <Card
            title={title}
            border={companyStyles.border}
            titleStyle={companyStyles.title}
            headerStyle={companyStyles.header}
            renderIcons={renderIcons}
            onPress={() =>
               navigation.navigate(OPPORTUNITY_DETAILS_PAGE, { id })
            }
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
            <CardBottomInfo
               salary={salary}
               type={type}
               workload={weeklyWorkload}
            />
            {renderActiveToggle()}
         </Card>
      </>
   );
}
