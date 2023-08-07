import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Opportunity } from '@/models/opportunities';
import { RootState } from '@/store';
import { useApplyToOpportunityMutation } from '@/services';
import Gap from '@/components/atoms/Gap';
import PageHeader from '@/components/molecules/PageHeader';
import OpportunityDetailsInfo from '@/components/molecules/OpportunityDetailsInfo';
import TabGroup from '@/components/molecules/TabGroup';
import Button from '@/components/atoms/Button';
import useToast from '@/hooks/useToast';
import styles from './styles';

interface Props {
   opportunity: Opportunity;
}

export default function OpportunityDetailsTemplate({ opportunity }: Props) {
   const { t } = useTranslation('opportunities');
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const toast = useToast();

   const [applyToOpportunity, { isLoading: isApplying }] =
      useApplyToOpportunityMutation();

   function renderButtons() {
      if (profile === 'COMPANY')
         return (
            <Gap gap={16}>
               <Button label={t('buttons.update')} onPress={() => undefined} />
               <Button
                  mode="outlined"
                  label={t('buttons.create.internship')}
                  onPress={() => undefined}
               />
            </Gap>
         );

      const isApplied = opportunity.applied;
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
      <ScrollView>
         <PageHeader title={opportunity.title} hasBackButton />
         <Gap gap={24} style={styles.content}>
            <TabGroup
               tabs={[
                  {
                     title: t('tabs.general.info'),
                     component: (
                        <OpportunityDetailsInfo opportunity={opportunity} />
                     ),
                  },
                  {
                     title: t('tabs.proccess'),
                     component: <Text>processo</Text>,
                  },
               ]}
            />
            {renderButtons()}
         </Gap>
      </ScrollView>
   );
}
