import { Route } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
   route: Route<string, { id: number }>;
}

export default function OpportunityDetails({ route }: Props) {
   return (
      <View>
         <Text>{route.params.id}</Text>
      </View>
   );
}
