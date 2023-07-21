import { TabNavigationState } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PRIMARY_LIGHT } from '@/theme';
import TabBarButton from '@/components/atoms/TabBarButton';
import styles from './styles';

function getLabel(tabBarLabel: string, title: string, routeName: string) {
   if (tabBarLabel) return tabBarLabel;

   if (title) return title;

   return routeName;
}

export default function TabBar({
   state,
   descriptors,
   navigation,
}: {
   state: TabNavigationState<any>;
   descriptors: any;
   navigation: any;
}) {
   const theme = useTheme();
   return (
      <View style={styles.container}>
         {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = getLabel(
               options.tabBarLabel,
               options.title,
               route.name,
            );

            const isFocused = state.index === index;

            const onPress = () => {
               const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
               });

               if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ name: route.name, merge: true });
               }
            };

            const backgroundColor = isFocused ? PRIMARY_LIGHT : 'white';
            const textColor = isFocused
               ? theme.colors.primary
               : theme.colors.onSurfaceDisabled;
            return (
               <TabBarButton
                  key={label}
                  label={label}
                  isFocused={isFocused}
                  onPress={onPress}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                  options={options}
               />
            );
         })}
      </View>
   );
}
