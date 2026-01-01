import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors, combineStyles } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'delivered' | 'pending';
  style?: ViewStyle;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: colors.success,
          backgroundColor: colors.successLight,
          text: 'Online',
        };
      case 'offline':
        return {
          color: colors.mutedForeground,
          backgroundColor: colors.muted,
          text: 'Offline',
        };
      case 'delivered':
        return {
          color: colors.success,
          backgroundColor: colors.successLight,
          text: 'Delivered',
        };
      case 'pending':
        return {
          color: colors.warning,
          backgroundColor: '#fef3c7',
          text: 'Pending',
        };
      default:
        return {
          color: colors.mutedForeground,
          backgroundColor: colors.muted,
          text: status,
        };
    }
  };

  const config = getStatusConfig();

  const badgeStyles = combineStyles(
    {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: config.backgroundColor,
    },
    style
  );

  const textStyles = {
    fontSize: 12,
    fontWeight: '500' as const,
    color: config.color,
  };

  const dotStyles = {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: config.color,
    marginRight: 4,
  };

  return (
    <View style={badgeStyles}>
      <View style={dotStyles} />
      <Text style={textStyles}>{config.text}</Text>
    </View>
  );
};

export default StatusBadge;
