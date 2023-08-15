import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import Button from '@/components/atoms/Button';
import styles from './styles';

interface Props {
   title: string;
   description: string;
   visible: boolean;
   onDismiss: () => void;
   onCancel: () => void;
   onConfirm: () => void;
   isLoading: boolean;
   // eslint-disable-next-line react/require-default-props
   cancelText?: string;
   // eslint-disable-next-line react/require-default-props
   confirmText?: string;
}

export default function ConfirmationModal({
   title,
   description,
   visible,
   onDismiss,
   onCancel,
   onConfirm,
   isLoading,
   cancelText,
   confirmText,
}: Props) {
   const { t } = useTranslation('common');

   return (
      <Portal>
         <Modal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={styles.container}
         >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.buttons}>
               <Button
                  style={[styles.button, { marginRight: 8 }]}
                  textStyle={styles.buttonText}
                  mode="outlined"
                  small
                  label={cancelText || t('buttons.cancel')}
                  onPress={() => {
                     onCancel();
                  }}
                  disabled={isLoading}
               />
               <Button
                  style={styles.button}
                  textStyle={styles.buttonText}
                  label={confirmText || t('buttons.confirm')}
                  small
                  onPress={() => {
                     onConfirm();
                  }}
                  loading={isLoading}
               />
            </View>
         </Modal>
      </Portal>
   );
}
