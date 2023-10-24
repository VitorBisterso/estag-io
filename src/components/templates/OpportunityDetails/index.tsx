import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Opportunity } from '@/models/opportunities';
import { RootState } from '@/store';
import { useApplyToOpportunityMutation } from '@/services';
import Gap from '@/components/atoms/Gap';
import Button from '@/components/atoms/Button';
import PageHeader from '@/components/molecules/PageHeader';
import OpportunityDetailsInfo from '@/components/molecules/OpportunityDetailsInfo';
import TabGroup from '@/components/molecules/TabGroup';
import OpportunityProcessSteps from '@/components/organisms/OpportunityProcessSteps';
import useToast from '@/hooks/useToast';
import * as RootNavigation from '@/navigation';
import {
   CREATE_INTERNSHIP_PAGE,
   MANAGE_PROCESS_STEPS_PAGE,
   OPPORTUNITIES_PAGE,
   UPDATE_OPPORTUNTITY_PAGE,
} from '@/consts';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

export default function OpportunityDetailsTemplate({ opportunity }: Props) {
   const { t } = useTranslation('opportunities');
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [tabIndex, setTabIndex] = useState(0);

   const [applyToOpportunity, { isLoading: isApplying }] =
      useApplyToOpportunityMutation();

   function navigateToUpdatePage() {
      if (tabIndex === 0) {
         navigation.navigate(UPDATE_OPPORTUNTITY_PAGE, {
            id: opportunity.id,
         });
         return;
      }

      navigation.navigate(MANAGE_PROCESS_STEPS_PAGE, {
         id: opportunity.id,
         title: opportunity.title,
      });
   }

   function renderButtons() {
      if (profile === 'COMPANY')
         return (
            <Gap gap={16}>
               <Button
                  label={t('buttons.update')}
                  onPress={navigateToUpdatePage}
               />
               <Button
                  mode="outlined"
                  label={t('buttons.create.internship')}
                  onPress={() =>
                     RootNavigation.navigate(CREATE_INTERNSHIP_PAGE, {
                        opportunityId: opportunity.id,
                     })
                  }
               />
            </Gap>
         );

      const { isApplied } = opportunity;
      return (
         <Button
            label={
               isApplied ? t('buttons.already.applied') : t('buttons.apply')
            }
            loading={isApplying}
            disabled={isApplied}
            onPress={() =>
               applyToOpportunity(opportunity.id)
                  .unwrap()
                  .then(() => toast.success(t('messages.applied')))
            }
         />
      );
   }

   return (
      <ScrollView style={styles.container}>
         <PageHeader
            title={opportunity.title}
            hasBackButton
            onBack={() => navigation.navigate(OPPORTUNITIES_PAGE)}
         />
         <Gap gap={24} style={styles.content}>
            <TabGroup
               controlled
               currentTab={tabIndex}
               setTab={setTabIndex}
               tabs={[
                  {
                     title: t('tabs.general.info'),
                     component: (
                        <OpportunityDetailsInfo opportunity={opportunity} />
                     ),
                  },
                  {
                     title: t('tabs.process'),
                     component: (
                        <OpportunityProcessSteps
                           id={opportunity.id}
                           isApplied={Boolean(opportunity.isApplied)}
                        />
                     ),
                  },
               ]}
            />
            {renderButtons()}
         </Gap>
      </ScrollView>
   );
}
