import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import PaperPlaneIcon from '../components/icons/PaperPlaneIcon';
import ShieldIcon from '../components/icons/ShieldIcon';
import DevicesIcon from '../components/icons/DevicesIcon';
import CloudIcon from '../components/icons/CloudIcon';
import PageIndicator from '../components/ui/PageIndicator';
import { colors, globalStyles, spacing } from '../lib/utils';
import { OnboardingSlide } from '../types';

type RootStackParamList = {
  Index: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Dashboard: undefined;
  Compose: undefined;
  Settings: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const isSmallScreen = screenWidth < 375;
const isLargeScreen = screenWidth > 428;

const slides: OnboardingSlide[] = [
  {
    id: 0,
    title: 'Send Data Without Internet',
    description:
      "Transmit important information easily, even when you're completely offline, using secure SMS technology.",
    icon: (
      <View style={{ position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            left: -64,
            top: -16,
            opacity: 0.6,
          }}
        >
          <CloudIcon size="lg" />
        </View>
        <View
          style={{
            position: 'absolute',
            right: -48,
            top: 0,
            opacity: 0.4,
          }}
        >
          <CloudIcon size="md" />
        </View>
        <View
          style={{
            width: 112,
            height: 112,
            borderRadius: 56,
            backgroundColor: colors.teal[100],
            alignItems: 'center',
            justifyContent: 'center',
            ...globalStyles.shadowSoft,
          }}
        >
          <PaperPlaneIcon variant="teal" size="md" />
        </View>
      </View>
    ),
  },
  {
    id: 1,
    title: 'Secure Encrypted Transmission',
    description:
      'Your data is protected with advanced encryption before being sent via secure SMS messages.',
    icon: <ShieldIcon size="xl" />,
  },
  {
    id: 2,
    title: 'Fully Automated & Cross-Platform',
    description:
      'Once initiated, the entire process runs automatically. Works seamlessly across all devices.',
    icon: <DevicesIcon size="xl" />,
  },
];

const Onboarding = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const titleFontSize = isSmallScreen ? 24 : isLargeScreen ? 32 : 28;
  const descriptionFontSize = isSmallScreen ? 14 : isLargeScreen ? 18 : 16;
  const buttonFontSize = isSmallScreen ? 14 : isLargeScreen ? 18 : 16;
  const skipFontSize = isSmallScreen ? 12 : isLargeScreen ? 16 : 14;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentSlide(currentSlide + 1);
        fadeAnim.setValue(0); // Reset opacity before fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentSlide(currentSlide - 1);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={[globalStyles.mobileContainer, { flex: 1, backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
          paddingTop: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
          paddingBottom: isSmallScreen ? spacing.sm : isLargeScreen ? spacing.lg : spacing.md,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={{
            padding: isSmallScreen ? 6 : isLargeScreen ? 12 : 8,
            marginLeft: isSmallScreen ? -6 : isLargeScreen ? -12 : -8,
            opacity: currentSlide === 0 ? 0 : 1,
          }}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={isSmallScreen ? 20 : isLargeScreen ? 28 : 24} color={colors.mutedForeground} />
        </TouchableOpacity>

        <PageIndicator total={slides.length} current={currentSlide} variant="navy" />

        <TouchableOpacity
          onPress={handleSkip}
          style={{ padding: isSmallScreen ? 6 : isLargeScreen ? 12 : 8 }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: skipFontSize,
              fontWeight: '500',
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: isSmallScreen ? spacing.lg : isLargeScreen ? spacing['2xl'] : spacing.xl,
          paddingBottom: isSmallScreen ? spacing.lg : isLargeScreen ? spacing.xl : spacing.xl,
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <View style={{ marginBottom: 48 }}>{slide.icon}</View>

          <Text
            style={{
              fontSize: titleFontSize,
              fontWeight: 'bold',
              color: colors.foreground,
              textAlign: 'center',
              marginBottom: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
              lineHeight: titleFontSize * 1.25,
            }}
          >
            {slide.title}
          </Text>

          <Text
            style={{
              fontSize: descriptionFontSize,
              color: colors.mutedForeground,
              textAlign: 'center',
              lineHeight: descriptionFontSize * 1.4,
              maxWidth: isSmallScreen ? 280 : isLargeScreen ? 360 : 320,
              paddingHorizontal: spacing.sm,
            }}
          >
            {slide.description}
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          paddingHorizontal: isSmallScreen ? spacing.md : isLargeScreen ? spacing.xl : spacing.lg,
          paddingBottom: isSmallScreen ? spacing.lg : isLargeScreen ? spacing.xl : spacing.xl,
          backgroundColor: colors.background,
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: colors.primary,
            borderRadius: isSmallScreen ? 10 : isLargeScreen ? 14 : 12,
            paddingVertical: isSmallScreen ? 14 : isLargeScreen ? 18 : 16,
            paddingHorizontal: isSmallScreen ? 20 : isLargeScreen ? 28 : 24,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...globalStyles.shadowSoft,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: colors.primaryForeground,
              fontSize: buttonFontSize,
              fontWeight: '600',
              marginRight: isSmallScreen ? 6 : isLargeScreen ? 12 : 8,
            }}
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight size={isSmallScreen ? 18 : isLargeScreen ? 24 : 20} color={colors.primaryForeground} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            color: colors.mutedForeground,
            fontSize: isSmallScreen ? 12 : isLargeScreen ? 16 : 14,
            marginTop: isSmallScreen ? 12 : isLargeScreen ? 20 : 16,
          }}
        >
          {currentSlide + 1} of {slides.length}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
