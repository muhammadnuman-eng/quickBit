import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Send } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../hooks/use-toast';
import { colors, globalStyles, spacing, combineStyles } from '../lib/utils';

type RootStackParamList = {
  Index: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Dashboard: undefined;
  Compose: undefined;
  Settings: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Compose'>;

const composeSchema = z.object({
  recipient: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(1, 'Message cannot be empty').max(500, 'Message too long'),
});

type ComposeForm = z.infer<typeof composeSchema>;

const Compose = () => {
  const navigation = useNavigation<NavigationProp>();
  const { showToast } = useToast();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm<ComposeForm>({
    resolver: zodResolver(composeSchema),
    defaultValues: {
      recipient: '',
      message: '',
    },
  });

  const message = watch('message');
  const recipient = watch('recipient');

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

  const handleSend = (data: ComposeForm) => {
    showToast({
      title: 'Message Sent',
      description: 'Your secure message has been transmitted via SMS.',
    });
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[globalStyles.mobileContainer]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        }}>
          Compose Message
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <Animated.View
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Recipient */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.foreground,
              marginBottom: 8,
            }}>
              Recipient
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: errors.recipient ? colors.destructive : colors.input,
              borderRadius: 12,
              backgroundColor: colors.background,
              paddingHorizontal: 16,
              paddingVertical: 12,
              minHeight: 48,
            }}>
              <Text style={{
                fontSize: 18,
                marginRight: 8,
                color: colors.mutedForeground,
              }}>
                🇵🇰
              </Text>
              <Controller
                control={control}
                name="recipient"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: colors.foreground,
                      paddingVertical: 0,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text.replace(/[^0-9+]/g, ''))}
                    placeholder="+92 Phone number"
                    placeholderTextColor={colors.mutedForeground}
                    keyboardType="phone-pad"
                  />
                )}
              />
            </View>
            {errors.recipient && (
              <Text style={{
                fontSize: 12,
                color: colors.destructive,
                marginTop: 4,
              }}>
                {errors.recipient.message}
              </Text>
            )}
          </View>

          {/* Message */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.foreground,
              marginBottom: 8,
            }}>
              Message
            </Text>
            <Controller
              control={control}
              name="message"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={combineStyles(
                    {
                      borderWidth: 1,
                      borderColor: errors.message ? colors.destructive : colors.input,
                      borderRadius: 12,
                      backgroundColor: colors.background,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: colors.foreground,
                      minHeight: 120,
                      textAlignVertical: 'top',
                    }
                  )}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Type your secure message here..."
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  maxLength={500}
                  numberOfLines={6}
                />
              )}
            />
            <Text style={{
              fontSize: 12,
              color: colors.mutedForeground,
              textAlign: 'right',
              marginTop: 4,
            }}>
              {message?.length || 0}/500
            </Text>
            {errors.message && (
              <Text style={{
                fontSize: 12,
                color: colors.destructive,
                marginTop: 4,
              }}>
                {errors.message.message}
              </Text>
            )}
          </View>

          {/* Info */}
          <View style={{
            backgroundColor: colors.cyanLight,
            borderRadius: 12,
            padding: spacing.md,
            borderWidth: 1,
            borderColor: colors.primary,
            marginBottom: spacing.lg,
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.foreground,
            }}>
              <Text style={{ fontWeight: '600' }}>🔒 Secure Transmission:</Text> Your message will be encrypted and sent via SMS technology.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={{
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        paddingTop: spacing.md,
      }}>
        <TouchableOpacity
          onPress={handleSubmit(handleSend)}
          disabled={!isValid || !recipient || !message}
          style={combineStyles(
            {
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              ...globalStyles.shadowSoft,
            },
            (!isValid || !recipient || !message) && { opacity: 0.5 }
          )}
          activeOpacity={0.8}
        >
          <Send size={20} color={colors.primaryForeground} />
          <Text style={{
            color: colors.primaryForeground,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8,
          }}>
            Send Securely
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Compose;
