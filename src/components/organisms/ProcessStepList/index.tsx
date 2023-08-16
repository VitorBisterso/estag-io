import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { ProcessStep } from '@/models/processSteps';
import { formatDate } from '@/utils';
import Gap from '@/components/atoms/Gap';
import Card from '@/components/molecules/Card';
import styles from './styles';

interface Props {
   processSteps: Array<ProcessStep>;
   withCards?: boolean;
}

export default function ProcessStepList({ processSteps, withCards }: Props) {
   const { t } = useTranslation('processSteps');
   function renderDate(deadline: string, onlyOnDeadline: boolean) {
      const date = formatDate(deadline);
      if (onlyOnDeadline) return t('labels.deadline.on', { date });

      return t('labels.deadline.until', { date });
   }

   function renderTitle(step: ProcessStep, stepNumber: number) {
      return (
         <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
               {`${stepNumber}. ${step.title}`}
            </Text>
            <Text style={styles.title}>{` - ${renderDate(
               step.deadline,
               step.onlyOnDeadline,
            )}`}</Text>
         </View>
      );
   }

   function renderSimplifiedView() {
      return (
         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {processSteps.map((step, index) => (
               <View key={step.id} style={styles.simplifiedContainer}>
                  {renderTitle(step, index + 1)}
                  <Text style={styles.description}>{step.description}</Text>
               </View>
            ))}
         </View>
      );
   }

   function renderIcons() {
      return (
         <View style={styles.row}>
            <IconButton icon="pencil" style={styles.icon} />
            <IconButton icon="delete" iconColor="red" style={styles.icon} />
         </View>
      );
   }

   function renderWithCards() {
      return processSteps.map((step, index) => (
         <Card
            title={`${index + 1}. ${step.title}`}
            titleStyle={styles.cardTitle}
            headerStyle={styles.cardHeader}
            renderIcons={renderIcons}
         >
            <Text style={styles.description} numberOfLines={3}>
               {step.description}
            </Text>
         </Card>
      ));
   }

   function renderContent() {
      if (withCards) return renderWithCards();

      return renderSimplifiedView();
   }

   return (
      <Gap gap={16} style={{ justifyContent: 'center' }}>
         {renderContent()}
      </Gap>
   );
}

ProcessStepList.defaultProps = {
   withCards: false,
};
