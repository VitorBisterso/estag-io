import { View } from 'react-native';

import ProcessStepForm from '@/components/organisms/ProcessStepForm';
import { Applicant } from '@/models/processSteps';
import styles from './styles';

interface Props {
   applicants: Array<Applicant>;
}

export default function CreateProcessStepTemplate({ applicants }: Props) {
   return (
      <View style={styles.container}>
         <ProcessStepForm availableApplicants={applicants} />
      </View>
   );
}
