import React from 'react';
import { requireNativeComponent, ViewStyle } from 'react-native';

const ComponentName = 'RNFamilyActivityPicker';

interface FamilyActivityPickerProps {
  /**
   * iOS 16+
   */
  headerText?: string;
  style?: ViewStyle;
  onActivityChange?: (value: string[]) => void;
}

const Component = requireNativeComponent(ComponentName);

export function FamilyActivityPicker({ onActivityChange, ...props }: FamilyActivityPickerProps) {
  return <Component {...props} onActivityChange={(event) => onActivityChange(event.nativeEvent)} />;
}
