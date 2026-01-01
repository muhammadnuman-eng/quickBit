import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/utils';

interface ShieldIconProps {
  className?: ViewStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ShieldIcon: React.FC<ShieldIconProps> = ({
  className = {},
  size = 'lg'
}) => {
  const sizeStyles = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 80, height: 80 },
  };

  return (
    <View style={[sizeStyles[size], className]}>
      <Svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <Path
          d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
          fill={colors.teal[600]}
          stroke={colors.teal[600]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 12L11 14L15 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default ShieldIcon;
