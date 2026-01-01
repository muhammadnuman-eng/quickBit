import React from 'react';
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputProps,
} from 'react-native';
import { colors, globalStyles, combineStyles } from '../../lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const containerStyles = combineStyles(
    {
      marginBottom: 16,
    },
    containerStyle
  );

  const inputContainerStyles = combineStyles(
    {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: error ? colors.destructive : colors.input,
      borderRadius: 12,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 48,
    },
    error && {
      borderColor: colors.destructive,
    }
  );

  const inputStyles = combineStyles(
    {
      flex: 1,
      fontSize: 16,
      color: colors.foreground,
      paddingVertical: 0,
      marginLeft: leftIcon ? 8 : 0,
      marginRight: rightIcon ? 8 : 0,
    },
    inputStyle
  );

  const labelStyles = combineStyles(
    {
      fontSize: 14,
      fontWeight: '500',
      color: colors.foreground,
      marginBottom: 8,
    },
    labelStyle
  );

  const errorStyles = {
    fontSize: 12,
    color: colors.destructive,
    marginTop: 4,
  };

  return (
    <View style={containerStyles}>
      {label && <Text style={labelStyles}>{label}</Text>}
      <View style={inputContainerStyles}>
        {leftIcon && leftIcon}
        <TextInput
          style={inputStyles}
          placeholderTextColor={colors.mutedForeground}
          {...textInputProps}
        />
        {rightIcon && rightIcon}
      </View>
      {error && <Text style={errorStyles}>{error}</Text>}
    </View>
  );
};

export default Input;
