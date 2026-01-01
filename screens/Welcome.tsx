import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowRight } from 'lucide-react-native';
import { colors, globalStyles, spacing } from '../lib/utils';
import PaperPlaneIcon from '../components/icons/PaperPlaneIcon';
import Input from '../components/ui/Input';
import PhoneInput from 'react-native-phone-number-input';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Index: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Dashboard: undefined;
  Compose: undefined;
  Settings: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const phoneInputRef = useRef<PhoneInput>(null);

  // Responsive sizing
  const isSmallScreen = screenWidth < 375;
  const isLargeScreen = screenWidth > 428;

  const titleFontSize = isSmallScreen ? 28 : isLargeScreen ? 36 : 32;
  const subtitleFontSize = isSmallScreen ? 16 : isLargeScreen ? 20 : 18;
  const buttonFontSize = isSmallScreen ? 16 : isLargeScreen ? 20 : 18;
  const iconSize = isSmallScreen ? 'md' : isLargeScreen ? 'xl' : 'lg';
  const maxWidth = isSmallScreen ? 320 : isLargeScreen ? 400 : 360;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleContinue = () => {
    if (phoneNumber.length < 6) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number.');
      return;
    }
    // Navigate to OTP input screen or verify
    Alert.alert('Phone Entered', `Number: ${phoneNumber}\nOTP: ${otp}`);
    // navigation.replace('Dashboard'); // Example
  };

  return (
    <SafeAreaView style={[globalStyles.mobileContainer, { flex: 1, backgroundColor: colors.background }]}>
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          paddingHorizontal: spacing.md,
        }}
      >
        {/* Icon */}
        <View style={{ marginBottom: isSmallScreen ? 24 : isLargeScreen ? 40 : 32 }}>
          <PaperPlaneIcon variant="gradient" size={iconSize} />
        </View>

        {/* Heading */}
        <Text
          style={{
            fontSize: titleFontSize,
            fontWeight: 'bold',
            color: colors.foreground,
            textAlign: 'center',
            marginBottom: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
          }}
        >
          Welcome to QuickBit
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: subtitleFontSize,
            color: colors.mutedForeground,
            textAlign: 'center',
            lineHeight: subtitleFontSize * 1.4,
            marginBottom: isSmallScreen ? 24 : isLargeScreen ? 40 : 32,
            maxWidth: maxWidth,
          }}
        >
          Enter your number to get started
        </Text>

        {/* Phone Number Input */}
        <View style={{ width: '100%', maxWidth: maxWidth, marginBottom: spacing.lg }}>
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="first"
            onChangeFormattedText={text => setPhoneNumber(text)}
            containerStyle={{
              width: '100%',
              height: 56,
              borderRadius: 12,
              backgroundColor: colors.muted,
            }}
            textContainerStyle={{
              paddingVertical: 0,
              backgroundColor: colors.background,
              borderRadius: 12,
            }}
            textInputStyle={{
              fontSize: 16,
              color: colors.foreground,
            }}
            codeTextStyle={{ fontSize: 16, color: colors.foreground }}
            flagButtonStyle={{ width: 50 }}
          />
        </View>

        {/* OTP Input */}
        <View style={{ width: '100%', maxWidth: maxWidth, marginBottom: spacing.lg }}>
          <Input
            label="Verification Code"
            placeholder="Enter 6-digit code"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            containerStyle={{ marginBottom: 0 }}
            inputStyle={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '600',
              letterSpacing: 8,
            }}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: colors.primary,
            borderRadius: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
            paddingVertical: isSmallScreen ? 14 : isLargeScreen ? 22 : 18,
            paddingHorizontal: isSmallScreen ? 24 : isLargeScreen ? 40 : 32,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...globalStyles.shadowSoft,
            minWidth: isSmallScreen ? 200 : isLargeScreen ? 280 : 240,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: colors.primaryForeground,
              fontSize: buttonFontSize,
              fontWeight: '600',
              marginRight: isSmallScreen ? 8 : isLargeScreen ? 16 : 12,
            }}
          >
            Continue Securely
          </Text>
          <ArrowRight size={isSmallScreen ? 18 : isLargeScreen ? 24 : 20} color={colors.primaryForeground} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Welcome;
