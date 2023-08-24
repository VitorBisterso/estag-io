import { View } from 'react-native';

import { Internship } from '@/models/internships';
import PageHeader from '@/components/molecules/PageHeader';
import InternshipDetails from '@/components/molecules/InternshipDetails';
import styles from './styles';

interface Props {
   internship: Internship;
}

export default function InternshipDetailsTemplate({ internship }: Props) {
   return (
      <View style={styles.container}>
         <PageHeader hasBackButton title={internship.student?.name} />
         <View style={styles.details}>
            <InternshipDetails internship={internship} />
         </View>
      </View>
   );
}
