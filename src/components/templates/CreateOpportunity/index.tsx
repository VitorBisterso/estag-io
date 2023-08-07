import { View } from 'react-native';

import CreateOpportunityForm from '@/components/organisms/OpportunityForm/Create';
import styles from './styles';

export default function CreateOpportunityTemplate() {
   return (
      <View style={styles.container}>
         <CreateOpportunityForm />
      </View>
   );
}
