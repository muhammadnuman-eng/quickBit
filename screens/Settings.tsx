import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Shield, Bell, Info, HelpCircle } from 'lucide-react-native';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const Settings = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const settingsItems = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Manage encryption and security settings',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Configure message notifications',
    },
    {
      icon: Info,
      title: 'About',
      subtitle: 'App version and information',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
    },
  ];

  return (
    <View style={[globalStyles.mobileContainer]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.border,
      }}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ padding: 8, marginLeft: -8 }}
        >
          <ChevronLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.foreground,
          marginLeft: 8,
        }}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: spacing.lg }}>
          {settingsItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.md,
                  backgroundColor: colors.card,
                  borderRadius: 12,
                  marginBottom: spacing.sm,
                  borderWidth: 0.5,
                  borderColor: colors.border,
                  ...globalStyles.shadowCard,
                }}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}>
                  <IconComponent size={20} color={colors.accentForeground} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.foreground,
                    marginBottom: 2,
                  }}>
                    {item.title}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedForeground,
                  }}>
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* App Info */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xl,
        }}>
          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: spacing.lg,
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: colors.border,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.foreground,
              marginBottom: 4,
            }}>
              QuickBit v1.0.0
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.mutedForeground,
              textAlign: 'center',
            }}>
              Secure Offline Messaging{'\n'}Built with React Native & Expo
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
