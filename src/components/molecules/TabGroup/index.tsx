import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import styles from './styles';

export interface Tab {
   title: string;
   component: React.ReactNode;
}

interface Props {
   tabs: Array<Tab>;
}

export default function TabGroup({ tabs }: Props) {
   const theme = useTheme();
   const [index, setIndex] = React.useState<number>(0);

   const selectedComponent = tabs[index].component;
   return (
      <View style={styles.container}>
         <View style={styles.tabs}>
            {tabs.map((tab, i) => {
               const isSelected = index === i;

               const color = isSelected
                  ? theme.colors.primary
                  : theme.colors.onSurfaceDisabled;
               const borderBottomWidth = isSelected ? 2 : 0;
               return (
                  <TouchableOpacity
                     key={tab.title}
                     style={[
                        styles.tabButton,
                        { borderBottomWidth, borderColor: color },
                     ]}
                     onPress={() => setIndex(i)}
                  >
                     <Text
                        numberOfLines={2}
                        style={[styles.tabButtonText, { color }]}
                     >
                        {tab.title}
                     </Text>
                  </TouchableOpacity>
               );
            })}
         </View>
         {selectedComponent}
      </View>
   );
}
