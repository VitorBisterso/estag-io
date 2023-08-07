import { FAB } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import styles from './styles';

interface Props {
   icon: IconSource;
   onPress: () => void;
}

export default function Fab({ icon, onPress }: Props) {
   return <FAB icon={icon} onPress={onPress} style={styles.fab} />;
}
