import { ActivityIndicator } from 'react-native-paper';

interface Props {
   size?: number | 'small' | 'large';
}

export default function Loader({ size }: Props) {
   return (
      <ActivityIndicator animating size={size} style={{ margin: 'auto' }} />
   );
}

Loader.defaultProps = {
   size: 32,
};
