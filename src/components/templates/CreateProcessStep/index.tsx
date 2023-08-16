import { View } from 'react-native';

import ProcessStepForm from '@/components/organisms/ProcessStepForm';
import styles from './styles';

export default function CreateProcessStepTemplate() {
   return (
      <View style={styles.container}>
         <ProcessStepForm />
      </View>
   );
}
