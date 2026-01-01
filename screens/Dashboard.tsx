import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Check, Clock, ChevronRight } from 'lucide-react-native';
import PaperPlaneIcon from '../components/icons/PaperPlaneIcon';
import StatusBadge from '../components/ui/StatusBadge';
import { colors, globalStyles, spacing, combineStyles } from '../lib/utils';
import { Message } from '../types';

type RootStackParamList = {
  Index: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Dashboard: undefined;
  Compose: undefined;
  Settings: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const { width: screenWidth } = Dimensions.get('window');

// Responsive sizing
const isSmallScreen = screenWidth < 375;
const isLargeScreen = screenWidth > 428;

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'received',
    phoneNumber: '+1234567890',
    content: 'Project status update: Phase 1 successfully completed',
    status: 'delivered',
    time: '1h ago',
  },
  {
    id: '2',
    type: 'sent',
    phoneNumber: '+1234567881',
    content: 'Meeting confirmed for tomorrow at 3 PM',
    status: 'delivered',
    time: '2h ago',
  },
  {
    id: '3',
    type: 'sent',
    phoneNumber: '+1234567892',
    content: 'Emergency contact information updated',
    status: 'pending',
    time: '3h ago',
  },
];

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [messages] = useState<Message[]>(mockMessages);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  // Responsive sizing
  const headerTitleSize = isSmallScreen ? 16 : isLargeScreen ? 22 : 20;
  const headerSubtitleSize = isSmallScreen ? 12 : isLargeScreen ? 16 : 14;
  const sectionTitleSize = isSmallScreen ? 16 : isLargeScreen ? 22 : 18;
  const heroTitleSize = isSmallScreen ? 16 : isLargeScreen ? 22 : 20;
  const heroSubtitleSize = isSmallScreen ? 12 : isLargeScreen ? 16 : 14;
  const buttonTextSize = isSmallScreen ? 14 : isLargeScreen ? 18 : 16;
  const cardTextSize = isSmallScreen ? 12 : isLargeScreen ? 16 : 14;
  const statsTextSize = isSmallScreen ? 12 : isLargeScreen ? 16 : 14;
  const iconSize = isSmallScreen ? 16 : isLargeScreen ? 22 : 20;
  const cardIconSize = isSmallScreen ? 18 : isLargeScreen ? 24 : 20;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const sentCount = messages.filter((m) => m.type === 'sent').length;
  const receivedCount = messages.filter((m) => m.type === 'received').length;

  const MessageCard = ({ message, index }: { message: Message; index: number }) => {
    const cardAnim = new Animated.Value(0);

    React.useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: cardAnim,
          transform: [{
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        }}
      >
        <View style={{
          backgroundColor: colors.card,
          borderRadius: isSmallScreen ? 8 : isLargeScreen ? 16 : 12,
          padding: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md,
          marginBottom: isSmallScreen ? spacing.xs : isLargeScreen ? spacing.md : spacing.sm,
          borderWidth: 0.5,
          borderColor: colors.border,
          ...globalStyles.shadowCard,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
          <View style={{
            width: isSmallScreen ? 32 : isLargeScreen ? 48 : 40,
            height: isSmallScreen ? 32 : isLargeScreen ? 48 : 40,
            borderRadius: isSmallScreen ? 16 : isLargeScreen ? 24 : 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: isSmallScreen ? spacing.xs : isLargeScreen ? spacing.md : spacing.sm,
            flexShrink: 0,
            backgroundColor: message.status === 'delivered' ? colors.accent : colors.warning,
          }}>
            {message.status === 'delivered' ? (
              <Check size={cardIconSize} color={colors.accentForeground} />
            ) : (
              <Clock size={cardIconSize} color={colors.warning} />
            )}
          </View>

          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: isSmallScreen ? 2 : isLargeScreen ? 6 : 4,
            }}>
              <Text style={{
                fontSize: cardTextSize,
                fontWeight: '500',
                color: colors.foreground,
              }}>
                {message.type === 'received' ? 'FROM' : 'TO'} {message.phoneNumber}
              </Text>
              <StatusBadge status={message.status} />
            </View>
            <Text
              style={{
                fontSize: cardTextSize,
                color: colors.mutedForeground,
                marginBottom: isSmallScreen ? 2 : isLargeScreen ? 6 : 4,
                lineHeight: cardTextSize * 1.3,
              }}
              numberOfLines={2}
            >
              {message.content}
            </Text>
            <Text style={{
              fontSize: isSmallScreen ? 10 : isLargeScreen ? 14 : 12,
              color: colors.mutedForeground,
            }}>
              {message.time}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[globalStyles.mobileContainer]}>
      {/* Header */}
      <View style={{
        backgroundColor: colors.background,
        paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
        paddingTop: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
        paddingBottom: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.border,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isSmallScreen ? 2 : isLargeScreen ? 6 : 4,
        }}>
          <View>
            <Text style={{
              fontSize: headerTitleSize,
              fontWeight: 'bold',
              color: colors.foreground,
            }}>
              QuickBit
            </Text>
            <Text style={{
              fontSize: headerSubtitleSize,
              color: colors.mutedForeground,
            }}>
              Secure Offline Messaging
            </Text>
          </View>
          <StatusBadge status="online" />
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={{
            backgroundColor: colors.background,
            paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
            paddingVertical: isSmallScreen ? spacing.lg : isLargeScreen ? spacing['2xl'] : spacing.xl,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.border,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={{
            alignItems: 'center',
            marginBottom: isSmallScreen ? spacing.lg : isLargeScreen ? spacing.xl : spacing.xl,
          }}>
            <View style={{ marginBottom: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md }}>
              <PaperPlaneIcon variant="gradient" size={isSmallScreen ? "md" : isLargeScreen ? "xl" : "lg"} />
            </View>
            <Text style={{
              fontSize: heroTitleSize,
              fontWeight: 'bold',
              color: colors.foreground,
              marginBottom: isSmallScreen ? 2 : isLargeScreen ? 6 : 4,
            }}>
              Send Data
            </Text>
            <Text style={{
              fontSize: heroSubtitleSize,
              color: colors.mutedForeground,
              textAlign: 'center',
              paddingHorizontal: spacing.sm,
            }}>
              Transmit important information securely via SMS
            </Text>
          </View>

          {/* Compose Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Compose')}
            style={{
              backgroundColor: colors.primary,
              borderRadius: isSmallScreen ? 10 : isLargeScreen ? 14 : 12,
              paddingVertical: isSmallScreen ? 14 : isLargeScreen ? 18 : 16,
              paddingHorizontal: isSmallScreen ? 16 : isLargeScreen ? 24 : 20,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              ...globalStyles.shadowSoft,
            }}
            activeOpacity={0.8}
          >
            <Plus size={iconSize} color={colors.primaryForeground} />
            <Text style={{
              color: colors.primaryForeground,
              fontSize: buttonTextSize,
              fontWeight: '600',
              marginLeft: isSmallScreen ? 6 : isLargeScreen ? 12 : 8,
            }}>
              Compose Message
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Messages Section */}
        <View style={{
          paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
          paddingVertical: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
          backgroundColor: colors.background,
        }}>
          <Text style={{
            fontSize: sectionTitleSize,
            fontWeight: '600',
            color: colors.foreground,
            marginBottom: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md,
          }}>
            Recent Messages
          </Text>

          <View>
            {messages.map((message, index) => (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
              />
            ))}
          </View>

          {/* View All Link */}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingVertical: spacing.lg,
            }}
          >
            <Text style={{
              fontSize: 14,
              color: colors.primary,
              fontWeight: '500',
              marginRight: 4,
            }}>
              View All Messages
            </Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Stats */}
      <View style={{
        paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
        paddingBottom: isSmallScreen ? spacing.lg : isLargeScreen ? spacing.xl : spacing.xl,
        paddingTop: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md,
        backgroundColor: colors.background,
        borderTopWidth: 0.5,
        borderTopColor: colors.border,
      }}>
        <View style={{ flexDirection: 'row', gap: isSmallScreen ? spacing.xs : isLargeScreen ? spacing.md : spacing.sm }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              borderRadius: isSmallScreen ? 8 : isLargeScreen ? 16 : 12,
              paddingVertical: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
              alignItems: 'center',
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              color: colors.primaryForeground,
              fontSize: statsTextSize,
              fontWeight: '600',
            }}>
              {sentCount} Messages Sent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.accent,
              borderRadius: isSmallScreen ? 8 : isLargeScreen ? 16 : 12,
              paddingVertical: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
              alignItems: 'center',
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              color: colors.accentForeground,
              fontSize: statsTextSize,
              fontWeight: '600',
            }}>
              {receivedCount} Message Received
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
