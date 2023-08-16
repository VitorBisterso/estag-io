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
   controlled?: boolean;
   currentTab?: number;
   setTab?: (tab: number) => void;
}

export default function TabGroup({
   tabs,
   controlled,
   currentTab,
   setTab,
}: Props) {
   const theme = useTheme();
   const [index, setIndex] = React.useState<number>(0);

   function isTabSelected(currentIndex: number) {
      if (controlled) return currentIndex === currentTab;

      return index === currentIndex;
   }

   const selectedComponent = tabs[currentTab || index].component;
   return (
      <View style={styles.container}>
         <View style={styles.tabs}>
            {tabs.map((tab, i) => {
               const isSelected = isTabSelected(i);

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
                     onPress={() => (controlled ? setTab?.(i) : setIndex(i))}
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

TabGroup.defaultProps = {
   controlled: false,
   currentTab: 0,
   setTab: undefined,
};
