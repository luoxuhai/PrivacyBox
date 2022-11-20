// https://www.figma.com/file/CGjlBM0qcqtLKUVemRtl5R/APP?node-id=2%3A19
// https://www.radix-ui.com/docs/colors/palette-composition/the-scales

const BASE_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
};

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

  neutral1: '#fcfcfc',
  neutral2: '#f8f8f8',
  neutral3: '#f3f3f3',
  neutral4: '#ededed',
  neutral5: '#e8e8e8',
  neutral6: '#e2e2e2',
  neutral7: '#dbdbdb',
  neutral8: '#c7c7c7',
  neutral9: '#8f8f8f',
  neutral10: '#858585',
  neutral11: '#6f6f6f',
  neutral12: '#171717',

  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#34C759',
  teal: '#5AC8FA',
  blue: '#007AFF',
  indigo: '#5E5CE6',
  purple: '#AF52DE',
  pink: '#FF2D55',

  gray1: '#8E8E93',
  gray2: '#AEAEB2',
  gray3: '#C7C7CC',
  gray4: '#D1D1D6',
  gray5: '#E5E5EA',
  gray6: '#F2F2F7',

  overlay1: 'hsla(0, 0%, 0%, 0.012)',
  overlay2: 'hsla(0, 0%, 0%, 0.027)',
  overlay3: 'hsla(0, 0%, 0%, 0.047)',
  overlay4: 'hsla(0, 0%, 0%, 0.071)',
  overlay5: 'hsla(0, 0%, 0%, 0.090)',
  overlay6: 'hsla(0, 0%, 0%, 0.114)',
  overlay7: 'hsla(0, 0%, 0%, 0.141)',
  overlay8: 'hsla(0, 0%, 0%, 0.220)',
  overlay9: 'hsla(0, 0%, 0%, 0.439)',
  overlay10: 'hsla(0, 0%, 0%, 0.478)',
  overlay11: 'hsla(0, 0%, 0%, 0.565)',
  overlay12: 'hsla(0, 0%, 0%, 0.910)',
} as const;

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

  neutral1: '#161616',
  neutral2: '#1c1c1c',
  neutral3: '#232323',
  neutral4: '#282828',
  neutral5: '#2e2e2e',
  neutral6: '#343434',
  neutral7: '#3e3e3e',
  neutral8: '#505050',
  neutral9: '#707070',
  neutral10: '#7e7e7e',
  neutral11: '#a0a0a0',
  neutral12: '#ededed',

  red: '#FF453A',
  orange: '#FF9F0A',
  yellow: '#FFD60A',
  green: '#32D74B',
  teal: '#64D2FF',
  blue: '#0A84FF',
  indigo: '#7D7AFF',
  purple: '#BF5AF2',
  pink: '#FF2D55',

  gray1: '#8E8E93',
  gray2: '#636366',
  gray3: '#48484A',
  gray4: '#3A3A3C',
  gray5: '#2C2C2E',
  gray6: '#1C1C1E',

  overlay1: 'hsla(0, 0%, 100%, 0)',
  overlay2: 'hsla(0, 0%, 100%, 0.013)',
  overlay3: 'hsla(0, 0%, 100%, 0.034)',
  overlay4: 'hsla(0, 0%, 100%, 0.056)',
  overlay5: 'hsla(0, 0%, 100%, 0.086)',
  overlay6: 'hsla(0, 0%, 100%, 0.124)',
  overlay7: 'hsla(0, 0%, 100%, 0.176)',
  overlay8: 'hsla(0, 0%, 100%, 0.249)',
  overlay9: 'hsla(0, 0%, 100%, 0.386)',
  overlay10: 'hsla(0, 0%, 100%, 0.446)',
  overlay11: 'hsla(0, 0%, 100%, 0.592)',
  overlay12: 'hsla(0, 0%, 100%, 0.923)',
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

  success: lightPalette.green,

  warning: lightPalette.orange,

  error: lightPalette.red,

  danger: lightPalette.red,

  label: lightPalette.black,
  secondaryLabel: lightPalette.gray1,
  tertiaryLabel: lightPalette.gray2,
  quaternaryLabel: lightPalette.gray3,

  placeholderText: lightPalette.neutral10,

  link: lightPalette.blue,

  background: lightPalette.white,
  secondaryBackground: lightPalette.neutral3,
  tertiaryBackground: lightPalette.neutral4,

  fill: 'rgba(120, 120, 128, 0.2)',
  secondaryFill: 'rgba(120, 120, 128, 0.16)',
  tertiaryFill: 'rgba(120, 120, 128, 0.12)',
  quaternaryFill: 'rgba(120, 120, 128, 0.08)',

  separator: 'rgb(60, 60, 67)',
  opaqueSeparator: 'rgba(60, 60, 67, 0.33)',

  disabled: lightPalette.neutral9,
};

const darkColors = {
  palette: darkPalette,

  transparent: 'rgba(0, 0, 0, 0)',

  success: darkPalette.green,

  warning: darkPalette.orange,

  error: darkPalette.red,

  danger: darkPalette.red,

  label: darkPalette.white,
  secondaryLabel: darkPalette.gray1,
  tertiaryLabel: darkPalette.gray2,
  quaternaryLabel: darkPalette.gray3,

  placeholderText: darkPalette.neutral10,

  link: darkPalette.blue,

  background: darkPalette.black,
  secondaryBackground: darkPalette.neutral3,
  tertiaryBackground: darkPalette.neutral4,

  fill: 'rgba(120, 120, 128, 0.5)',
  secondaryFill: 'rgba(120, 120, 128, 0.32)',
  tertiaryFill: 'rgba(120, 120, 128, 0.24)',
  quaternaryFill: 'rgba(120, 120, 128, 0.18)',

  separator: 'rgb(84, 84, 88)',
  opaqueSeparator: 'rgba(84, 84, 88, 0.7)',

  disabled: lightPalette.neutral9,
};

export const colors = {
  light: lightColors,
  dark: darkColors,
};

export type Colors = typeof lightColors;
