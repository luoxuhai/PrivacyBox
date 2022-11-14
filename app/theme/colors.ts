// https://www.figma.com/file/CGjlBM0qcqtLKUVemRtl5R/APP?node-id=2%3A19

export const darkPalette = {
  primary1: '#ede8ff',
  primary2: '#dbd1fe',
  primary3: '#c9bafd',
  primary4: '#b6a4fc',
  primary5: '#a18efa',
  primary6: '#8b79f8', // Basic
  primary7: '#7364ca',
  primary8: '#5c509e',
  primary9: '#463c74',
  primary10: '#302a4d',

  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  systemRed: '#FF453A',
  systemOrange: '#FF9F0A',
  systemYellow: '#FFD60A',
  systemGreen: '#32D74B',
  systemTeal: '#64D2FF',
  systemBlue: '#0A84FF',
  systemIndigo: '#7D7AFF',
  systemPurple: '#BF5AF2',
  systemPink: '#FF2D55',

  systemGray1: '#8E8E93',
  systemGray2: '#636366',
  systemGray3: '#48484A',
  systemGray4: '#3A3A3C',
  systemGray5: '#2C2C2E',
  systemGray6: '#1C1C1E',

  overlay10: 'rgba(25, 16, 21, 0.1)',
  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay30: 'rgba(25, 16, 21, 0.3)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
  overlay80: 'rgba(25, 16, 21, 0.8)',
} as const;

export const lightPalette = {
  primary1: '#ede8ff',
  primary2: '#dbd1fe',
  primary3: '#c9bafd',
  primary4: '#b6a4fc',
  primary5: '#a18efa',
  primary6: '#8b79f8', // Basic
  primary7: '#7364ca',
  primary8: '#5c509e',
  primary9: '#463c74',
  primary10: '#302a4d',

  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  systemRed: '#FF3B30',
  systemOrange: '#FF9500',
  systemYellow: '#FFCC00',
  systemGreen: '#34C759',
  systemTeal: '#5AC8FA',
  systemBlue: '#007AFF',
  systemIndigo: '#5E5CE6',
  systemPurple: '#AF52DE',
  systemPink: '#FF2D55',

  systemGray1: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',

  overlay10: 'rgba(25, 16, 21, 0.1)',
  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay30: 'rgba(25, 16, 21, 0.3)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
  overlay80: 'rgba(25, 16, 21, 0.8)',
} as const;

function generateColors(palette: typeof darkPalette | typeof lightPalette) {
  return {
    /**
     * The palette is available to use, but prefer using the name.
     * This is only included for rare, one-off cases. Try to use
     * semantic names as much as possible.
     */
    palette,
    /**
     * A helper for making something see-thru.
     */
    transparent: 'rgba(0, 0, 0, 0)',
    /**
     * The default text color in many components.
     */
    text: palette.neutral800,
    /**
     * Secondary text information.
     */
    textDim: palette.neutral600,
    /**
     * The default color of the screen background.
     */
    background: palette.neutral200,
    /**
     * The default border color.
     */
    border: palette.neutral400,
    /**
     * The main tinting color.
     */
    tint: palette.primary5,
    /**
     * A subtle color used for lines.
     */
    separator: palette.neutral300,
    /**
     * Error messages.
     */
    error: palette.systemRed,
    error2: palette.angry500,

    success: palette.systemGreen,

    warning: palette.systemOrange,

    
    label: BASE_COLORS.black,
    secondaryLabel: chroma('#3C3C43').alpha(0.6).css(),
    tertiaryLabel: chroma('#3C3C43').alpha(0.3).css(),
    quaternaryLabel: chroma('#3C3C43').alpha(0.18).css(),
    placeholderText: '',
    separator: '',
    opaqueSeparator,
    link: '',

    background: '',
    secondaryBackground: '',
    tertiaryBackground: '',
  };
}

export const colors = {
  light: generateColors(lightPalette),
  dark: generateColors(darkPalette),
  ...generateColors(lightPalette),
};

export type Colors = typeof colors.light;

// const { colors, typography, spacing, isDark } = useTheme();
// <View style={{ backgroundColor: colors.primary6 }} />
