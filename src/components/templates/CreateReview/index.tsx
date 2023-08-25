import { View } from 'react-native';

import ReviewForm from '@/components/organisms/ReviewForm';
import styles from './styles';

export default function CreateReviewTemplate() {
   return (
      <View style={styles.container}>
         <ReviewForm />
      </View>
   );
}
