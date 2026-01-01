import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, combineStyles } from '../../lib/utils';

interface PageIndicatorProps {
  total: number;
  current: number;
  variant?: 'navy' | 'teal' | 'coral';
  style?: ViewStyle;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  total,
  current,
  variant = 'navy',
  style
}) => {
  const getColor = () => {
    switch (variant) {
      case 'teal':
        return colors.teal[600];
      case 'coral':
        return colors.coral[500];
      default:
        return colors.navy[800];
    }
  };

  const activeColor = getColor();
  const inactiveColor = colors.muted;

  const containerStyles = combineStyles(
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    style
  );

  const dotStyles = (isActive: boolean) => ({
    width: isActive ? 24 : 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: isActive ? activeColor : inactiveColor,
  });

  return (
    <View style={containerStyles}>
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          style={dotStyles(index === current)}
        />
      ))}
    </View>
  );
};

export default PageIndicator;
