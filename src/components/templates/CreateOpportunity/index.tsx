import { View } from 'react-native';

import OpportunityForm from '@/components/organisms/OpportunityForm';
import styles from './styles';

export default function CreateOpportunityTemplate() {
   return (
      <View style={styles.container}>
         <OpportunityForm />
      </View>
   );
}
