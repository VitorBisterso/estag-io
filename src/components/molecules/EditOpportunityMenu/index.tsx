import { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MANAGE_PROCESS_STEPS_PAGE, UPDATE_OPPORTUNTITY_PAGE } from '@/consts';
import styles from './styles';

interface Props {
   opportunityId: number;
   opportunityTitle: string;
}

export default function EditOpportunityMenu({
   opportunityId,
   opportunityTitle,
}: Props) {
   const { t } = useTranslation('opportunities');
   const navigation = useNavigation<any>();
   const [visible, setVisible] = useState(false);

   const openMenu = () => setVisible(true);
   const closeMenu = () => setVisible(false);

   return (
      <Menu
         visible={visible}
         onDismiss={closeMenu}
         anchor={
            <IconButton
               onPress={(e) => {
                  e.stopPropagation();
                  openMenu();
               }}
               style={styles.icon}
               icon="pencil"
               iconColor="black"
            />
         }
      >
         <Menu.Item
            onPress={() => {
               closeMenu();
               navigation.navigate(UPDATE_OPPORTUNTITY_PAGE, {
                  id: opportunityId,
               });
            }}
            title={t('labels.edit.menu.basic.info')}
         />
         <Menu.Item
            onPress={() => {
               closeMenu();
               navigation.navigate(MANAGE_PROCESS_STEPS_PAGE, {
                  id: opportunityId,
                  title: opportunityTitle,
               });
            }}
            title={t('labels.edit.menu.steps')}
         />
      </Menu>
   );
}
