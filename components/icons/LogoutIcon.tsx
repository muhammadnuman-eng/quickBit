import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/utils';

interface LogoutIconProps {
  className?: ViewStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LogoutIcon: React.FC<LogoutIconProps> = ({
  className = {},
  size = 'lg'
}) => {
  const sizeStyles = {
    sm: { width: 20, height: 20 },
    md: { width: 24, height: 24 },
    lg: { width: 28, height: 28 },
    xl: { width: 32, height: 32 },
  };

  return (
    <View style={[sizeStyles[size], className]}>
      <Svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <Path
          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
          stroke={colors.foreground}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 17L21 12L16 7"
          stroke={colors.foreground}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 12H9"
          stroke={colors.foreground}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default LogoutIcon;
