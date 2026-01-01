import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/utils';

interface CloudIconProps {
  className?: ViewStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CloudIcon: React.FC<CloudIconProps> = ({
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
          d="M18 10H16.74C16.365 7.688 14.024 6 12 6C9.976 6 7.635 7.688 7.26 10H6C4.895 10 4 10.895 4 12C4 13.105 4.895 14 6 14H18C19.105 14 20 13.105 20 12C20 10.895 19.105 10 18 10Z"
          stroke={colors.teal[400]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={colors.teal[100]}
          opacity={0.6}
        />
      </Svg>
    </View>
  );
};

export default CloudIcon;
