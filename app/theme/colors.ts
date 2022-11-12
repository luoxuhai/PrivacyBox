// https://www.figma.com/file/CGjlBM0qcqtLKUVemRtl5R/APP?node-id=2%3A19

const darkPalette = {
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

  neutral1: '#FFFFFF',
  neutral2: '#F4F2F1',
  neutral3: '#D7CEC9',
  neutral4: '#B6ACA6',
  neutral5: '#978F8A',
  neutral6: '#564E4A',
  neutral7: '#3C3836',
  neutral8: '#191015',
  neutral9: '#000000',

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

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
};

const lightPalette = {
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

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
};

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
    error: palette.angry500,
    /**
     * Error Background.
     *
     */
    errorBackground: palette.angry100,
  };
}

export const darkColors = generateColors(darkPalette);
export const lightColors = generateColors(lightPalette);
export const colors = generateColors(lightPalette);

export type Colors = typeof darkColors;
