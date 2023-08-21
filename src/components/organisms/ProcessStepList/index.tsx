import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ProcessStep } from '@/models/processSteps';
import Gap from '@/components/atoms/Gap';
import Card from '@/components/molecules/Card';
import ConfirmationModal from '@/components/molecules/ConfirmationModal';
import { useDeleteProcessStepMutation } from '@/services/processSteps';
import useToast from '@/hooks/useToast';
import { UPDATE_PROCESS_STEP_PAGE } from '@/consts';
import styles from './styles';
import SimplifiedView from './simplified';

interface Props {
   opportunityId: number;
   processSteps: Array<ProcessStep>;
   withCards?: boolean;
}

export default function ProcessStepList({
   opportunityId,
   processSteps,
   withCards,
}: Props) {
   const { t } = useTranslation(['processSteps', 'common']);
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [deleteStep, { isLoading: isDeleting }] =
      useDeleteProcessStepMutation();

   const [modalVisible, setModalVisibility] = useState(false);
   const [stepToDelete, setStepToDelete] = useState<ProcessStep>(
      {} as ProcessStep,
   );

   function renderIcons(step: ProcessStep) {
      return (
         <View style={styles.row}>
            <IconButton
               icon="pencil"
               style={styles.icon}
               onPress={() =>
                  navigation.navigate(UPDATE_PROCESS_STEP_PAGE, {
                     opportunityId,
                     step,
                  })
               }
            />
            <IconButton
               icon="delete"
               iconColor="red"
               style={styles.icon}
               onPress={() => {
                  setStepToDelete(step);
                  setModalVisibility(true);
               }}
            />
         </View>
      );
   }

   function renderWithCards() {
      return processSteps.map((step, index) => (
         <Card
            key={step.id}
            title={`${index + 1}. ${step.title}`}
            titleStyle={styles.cardTitle}
            headerStyle={styles.cardHeader}
            renderIcons={() => renderIcons(step)}
         >
            <Text style={styles.description} numberOfLines={3}>
               {step.description}
            </Text>
         </Card>
      ));
   }

   function renderContent() {
      if (withCards) return renderWithCards();

      return <SimplifiedView processSteps={processSteps} />;
   }

   function hideModal() {
      setModalVisibility(false);
   }

   return (
      <>
         <ConfirmationModal
            visible={modalVisible}
            title={t('modals.delete.title')}
            description={t('modals.delete.description', {
               step: stepToDelete.title,
            })}
            confirmText={t('buttons.delete', { ns: 'common' })}
            onDismiss={hideModal}
            onCancel={hideModal}
            onConfirm={() => {
               deleteStep(stepToDelete.id)
                  .unwrap()
                  .then(() => {
                     toast.success(t('messages.deleted'));
                     hideModal();
                  });
            }}
            isLoading={isDeleting}
         />
         <Gap gap={16} style={{ justifyContent: 'center' }}>
            {renderContent()}
         </Gap>
      </>
   );
}

ProcessStepList.defaultProps = {
   withCards: false,
};
