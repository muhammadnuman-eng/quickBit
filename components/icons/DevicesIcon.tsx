import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../../lib/utils';

interface DevicesIconProps {
  className?: ViewStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const DevicesIcon: React.FC<DevicesIconProps> = ({
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
          d="M10 16V18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18V16"
          stroke={colors.teal[600]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          x="4"
          y="4"
          width="8"
          height="12"
          rx="2"
          stroke={colors.teal[600]}
          strokeWidth="2"
          fill="none"
        />
        <Rect
          x="12"
          y="8"
          width="8"
          height="12"
          rx="2"
          stroke={colors.teal[600]}
          strokeWidth="2"
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default DevicesIcon;
