import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Button from './Button';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  confirmVariant = 'danger',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Cancel"
                onPress={onCancel}
                variant="secondary"
                fullWidth
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title={confirmLabel}
                onPress={onConfirm}
                variant={confirmVariant}
                fullWidth
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default ConfirmModal;
