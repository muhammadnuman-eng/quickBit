import { StyleSheet } from 'react-native';

export const colors = {
  // Primary colors
  primary: '#0d9488',
  primaryForeground: '#ffffff',
  secondary: '#ea580c',
  secondaryForeground: '#ffffff',

  // Background colors
  background: '#ffffff',
  foreground: '#1e293b',

  // Card colors
  card: '#ffffff',
  cardForeground: '#1e293b',

  // Muted colors
  muted: '#f0f9ff',
  mutedForeground: '#64748b',

  // Accent colors
  accent: '#5eead4',
  accentForeground: '#ffffff',

  // Destructive colors
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',

  // Border colors
  border: '#e2e8f0',
  input: '#e2e8f0',
  ring: '#0d9488',

  // Custom QuickBit colors
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  coral: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  navy: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: '#22c55e',
  successLight: '#dcfce7',
  warning: '#eab308',
  cyanLight: '#cffafe',
  gradientTeal: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
  gradientRainbow: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 33%, #F97316 66%, #EAB308 100%)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const shadows = {
  soft: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  card: {
    shadowColor: colors.navy[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  button: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mobileContainer: {
    flex: 1,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  fullWidth: {
    width: '100%',
  },
  padding: {
    padding: spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },
  paddingVertical: {
    paddingVertical: spacing.md,
  },
  margin: {
    margin: spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: spacing.md,
  },
  marginVertical: {
    marginVertical: spacing.md,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  borderRadius: {
    borderRadius: borderRadius.lg,
  },
  shadowSoft: shadows.soft,
  shadowCard: shadows.card,
  shadowButton: shadows.button,
});

// Utility function for combining styles
export function combineStyles(...styles: any[]) {
  return StyleSheet.flatten(styles);
}

// Utility function for creating responsive styles
export function responsiveStyle(baseStyle: any, overrides: any = {}) {
  return StyleSheet.flatten([baseStyle, overrides]);
}
