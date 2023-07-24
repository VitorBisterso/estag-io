import { IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import styles from './styles';

interface Props {
   icon: IconSource;
   onPress?: () => void;
}

export default function ThemedIconButton({ icon, onPress }: Props) {
   return <IconButton icon={icon} style={styles.button} onPress={onPress} />;
}

ThemedIconButton.defaultProps = {
   onPress: undefined,
};
