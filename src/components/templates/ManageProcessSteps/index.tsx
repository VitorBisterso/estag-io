import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProcessStep } from '@/models/processSteps';
import Fab from '@/components/atoms/Fab';
import PageHeader from '@/components/molecules/PageHeader';
import ProcessStepList from '@/components/organisms/ProcessStepList';
import { CREATE_PROCESS_STEP_PAGE } from '@/consts';
import styles from './styles';

interface Props {
   opportunityId: number;
   opportunityTitle: string;
   processSteps: Array<ProcessStep>;
}

export default function ManageProcessStepsTemplate({
   opportunityId,
   opportunityTitle,
   processSteps,
}: Props) {
   const navigation = useNavigation<any>();

   return (
      <View style={styles.container}>
         <PageHeader withTitle title={opportunityTitle} hasBackButton />
         <ScrollView style={styles.listContainer}>
            <ProcessStepList
               opportunityId={opportunityId}
               processSteps={processSteps}
               withCards
            />
         </ScrollView>
         <Fab
            icon="plus"
            onPress={() =>
               navigation.navigate(CREATE_PROCESS_STEP_PAGE, { opportunityId })
            }
         />
      </View>
   );
}
