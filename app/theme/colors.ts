// https://www.figma.com/file/CGjlBM0qcqtLKUVemRtl5R/APP?node-id=2%3A19

const BASE_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
};

export const darkPalette = {
  ...BASE_COLORS,

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
  ...BASE_COLORS,

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

const lightColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette: lightPalette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',

  error: lightPalette.systemRed,

  success: lightPalette.systemGreen,

  warning: lightPalette.systemOrange,

  label: lightPalette.black,
  secondaryLabel: 'rgba(235, 235, 245, 0.6)',
  tertiaryLabel: 'rgba(235, 235, 245, 0.3)',
  quaternaryLabel: 'rgba(235, 235, 245, 0.18)',

  placeholderText: '',

  separator: '#C6C6C8',
  opaqueSeparator: 'rgba(60, 60, 67, 0.33)',

  link: lightPalette.systemBlue,

  background: '#FFFFFF',
  secondaryBackground: '#F2F2F7',
  tertiaryBackground: 'rgba(0, 0, 0, 0.02)',

  fill: 'rgba(120, 120, 128, 0.2)',
  secondaryFill: 'rgba(120, 120, 128, 0.16)',
  tertiaryFill: 'rgba(120, 120, 128, 0.12)',
  quaternaryFill: 'rgba(120, 120, 128, 0.08)',

  disabled: '#979592',
};

const darkColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette: darkPalette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',

  error: darkPalette.systemRed,

  success: darkPalette.systemGreen,

  warning: darkPalette.systemOrange,

  label: darkPalette.white,
  secondaryLabel: 'rgba(235, 235, 245, 0.6)',
  tertiaryLabel: 'rgba(235, 235, 245, 0.3)',
  quaternaryLabel: 'rgba(235, 235, 245, 0.18)',

  placeholderText: '',

  separator: '#252627',
  opaqueSeparator: 'rgba(84, 84, 88, 0.7)',

  link: darkPalette.systemBlue,

  background: darkPalette.black,
  secondaryBackground: '#1C1C1E',
  tertiaryBackground: '#2C2C2E',

  fill: 'rgba(120, 120, 128, 0.5)',
  secondaryFill: 'rgba(120, 120, 128, 0.32)',
  tertiaryFill: 'rgba(111, 114, 120, 0.24)',
  quaternaryFill: 'rgba(116, 116, 128, 0.18)',

  disabled: '#757575',
};

export const colors = {
  light: lightColors,
  dark: darkColors,
};

export type Colors = typeof lightColors;
