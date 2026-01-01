import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PaperPlaneIcon from '../components/icons/PaperPlaneIcon';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Index'>;

const { width, height } = Dimensions.get('window');

const Index = () => {
  const navigation = useNavigation<NavigationProp>();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    floatAnimation.start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => {
      clearTimeout(timer);
      floatAnimation.stop();
    };
  }, [navigation, scaleAnim, opacityAnim, floatAnim]);

  return (
    <SafeAreaView style={[globalStyles.mobileContainer, { flex: 1, backgroundColor: colors.background }]}>
      {/* Center Content */}
      <View style={[globalStyles.centerContent, { flex: 1 }]}>
        <Animated.View
          style={{
            alignItems: 'center',
            transform: [
              { scale: scaleAnim },
              { translateY: floatAnim },
            ],
            opacity: opacityAnim,
          }}
        >
          <View style={{ marginBottom: 24 }}>
            <PaperPlaneIcon variant="gradient" size="xl" />
          </View>
          <Animated.Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.foreground,
              opacity: opacityAnim,
              textAlign: 'center',
            }}
          >
            QuickBit
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: 16,
              color: colors.mutedForeground,
              marginTop: 8,
              opacity: opacityAnim,
              textAlign: 'center',
            }}
          >
            Secure Offline Messaging
          </Animated.Text>
        </Animated.View>
      </View>

      {/* Bottom Loading Indicator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: spacing.sm,
          paddingBottom: spacing.lg,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.primary,
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
              transform: [
                {
                  scale: opacityAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Index;
