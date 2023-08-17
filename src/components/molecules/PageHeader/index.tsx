import React from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import ThemedIconButton from '@/components/atoms/ThemedIconButton';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

interface Props {
   title?: string;
   withTitle?: boolean;
   children?: React.ReactNode;
   icon?: string;
   hasBackButton?: boolean;
   // eslint-disable-next-line react/require-default-props
   onBack?: () => void;
}

export default function PageHeader({
   title,
   withTitle,
   children,
   icon,
   hasBackButton,
   onBack,
}: Props) {
   const theme = useTheme();
   const navigation = useNavigation();

   function getBackPress() {
      if (onBack) return onBack;

      return () => navigation.goBack();
   }

   function renderBackButton() {
      if (!hasBackButton) return null;

      return <ThemedIconButton icon="chevron-left" onPress={getBackPress()} />;
   }

   function renderMainContent() {
      if (withTitle)
         return (
            <Text style={styles.title} numberOfLines={2}>
               {title}
            </Text>
         );

      return <View style={styles.children}>{children}</View>;
   }

   function renderIcon() {
      if (!icon) return null;

      return (
         <IconButton
            icon={icon}
            size={48}
            iconColor={theme.colors.primary}
            style={styles.icon}
         />
      );
   }

   return (
      <View style={styles.container}>
         {renderBackButton()}
         {renderMainContent()}
         {renderIcon()}
      </View>
   );
}

PageHeader.defaultProps = {
   title: '',
   withTitle: true,
   children: null,
   icon: undefined,
   hasBackButton: false,
};
