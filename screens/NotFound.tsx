import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home } from 'lucide-react-native';
import { colors, globalStyles, spacing } from '../lib/utils';

type RootStackParamList = {
  Index: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Dashboard: undefined;
  Compose: undefined;
  Settings: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotFound'>;

const NotFound = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleGoHome = () => {
    navigation.replace('Dashboard');
  };

  return (
    <View style={[globalStyles.mobileContainer, globalStyles.centerContent]}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{
          fontSize: 72,
          color: colors.mutedForeground,
          marginBottom: spacing.md,
        }}>
          404
        </Text>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.foreground,
          textAlign: 'center',
          marginBottom: spacing.sm,
        }}>
          Page Not Found
        </Text>
        <Text style={{
          fontSize: 16,
          color: colors.mutedForeground,
          textAlign: 'center',
          marginBottom: spacing.xl,
          maxWidth: 280,
        }}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <TouchableOpacity
          onPress={handleGoHome}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...globalStyles.shadowSoft,
          }}
          activeOpacity={0.8}
        >
          <Home size={20} color={colors.primaryForeground} />
          <Text style={{
            color: colors.primaryForeground,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8,
          }}>
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotFound;
