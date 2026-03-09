import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: '#4F46E5' },
    text: { color: '#FFFFFF' },
  },
  secondary: {
    container: { backgroundColor: '#F3F4F6' },
    text: { color: '#374151' },
  },
  danger: {
    container: { backgroundColor: '#EF4444' },
    text: { color: '#FFFFFF' },
  },
};

const SIZE_STYLES: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingVertical: 8 },
    text: { fontSize: 14 },
  },
  md: {
    container: { paddingVertical: 12 },
    text: { fontSize: 16 },
  },
  lg: {
    container: { paddingVertical: 16 },
    text: { fontSize: 18 },
  },
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={[styles.text, variantStyle.text, sizeStyle.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
});

export default Button;
