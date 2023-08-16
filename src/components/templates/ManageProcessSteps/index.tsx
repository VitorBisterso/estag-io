import { ScrollView, View } from 'react-native';

import { ProcessStep } from '@/models/processSteps';
import Fab from '@/components/atoms/Fab';
import PageHeader from '@/components/molecules/PageHeader';
import ProcessStepList from '@/components/organisms/ProcessStepList';
import styles from './styles';

interface Props {
   opportunityTitle: string;
   processSteps: Array<ProcessStep>;
}

export default function ManageProcessStepsTemplate({
   opportunityTitle,
   processSteps,
}: Props) {
   return (
      <View style={styles.container}>
         <PageHeader withTitle title={opportunityTitle} hasBackButton />
         <ScrollView style={styles.listContainer}>
            <ProcessStepList processSteps={processSteps} withCards />
         </ScrollView>
         <Fab icon="plus" onPress={() => undefined} />
      </View>
   );
}
