import { View } from 'react-native';

import InternshipForm from '@/components/organisms/InternshipForm';
import styles from './styles';

export default function CreateInternshipTemplate() {
   return (
      <View style={styles.container}>
         <InternshipForm />
      </View>
   );
}
