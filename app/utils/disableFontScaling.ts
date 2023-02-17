import { Text, TextInput } from 'react-native';

(Text as any).defaultProps = { ...((Text as any).defaultProps || {}), allowFontScaling: false };

(TextInput as any).defaultProps = {
  ...((TextInput as any).defaultProps || {}),
  allowFontScaling: false,
};
