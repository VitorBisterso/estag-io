import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
   return (
      <View style={styles.container}>
         <Text>Estag.io</Text>
         <Button
            icon="camera"
            onPress={() =>
               Toast.show({
                  type: 'success',
                  text1: 'Titulo',
                  text2: 'Descricao',
               })
            }
         >
            Teste de botão e ícone
         </Button>
         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
