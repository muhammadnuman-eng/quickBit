import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';
import { colors } from '../../lib/utils';

interface PaperPlaneIconProps {
  className?: ViewStyle;
  variant?: 'gradient' | 'teal' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PaperPlaneIcon: React.FC<PaperPlaneIconProps> = ({
  className = {},
  variant = 'gradient',
  size = 'lg'
}) => {
  const sizeStyles = {
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 80, height: 80 },
    xl: { width: 96, height: 96 },
  };

  const gradientId = `plane-gradient-${Math.random().toString(36).substr(2, 9)}`;

  const getFillColor = () => {
    switch (variant) {
      case 'teal':
        return colors.teal[600];
      case 'navy':
        return colors.navy[800];
      default:
        return `url(#${gradientId})`;
    }
  };

  const getStrokeColor = () => {
    switch (variant) {
      case 'teal':
        return colors.teal[600];
      case 'navy':
        return colors.navy[800];
      default:
        return `url(#${gradientId})`;
    }
  };

  return (
    <View style={[sizeStyles[size], className]}>
      <Svg viewBox="0 0 100 100" width="100%" height="100%">
        <Defs>
          {variant === 'gradient' && (
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#8B5CF6" />
              <Stop offset="33%" stopColor="#EC4899" />
              <Stop offset="66%" stopColor="#F97316" />
              <Stop offset="100%" stopColor="#EAB308" />
            </LinearGradient>
          )}
        </Defs>
        <Path
          d="M85 15L15 45L40 55L55 85L65 55L85 15Z"
          fill={getFillColor()}
          stroke={getStrokeColor()}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M40 55L55 45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="48"
          stroke={variant === 'gradient' ? `url(#${gradientId})` : 'transparent'}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          fill="none"
          opacity={0.3}
        />
      </Svg>
    </View>
  );
};

export default PaperPlaneIcon;
