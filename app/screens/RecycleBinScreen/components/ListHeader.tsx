import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useTheme } from '@/theme';
import { Text } from '@/components';
import { useStores } from '@/models';

export const ListHeader = observer(() => {
  const { colors } = useTheme();
  const {
    settingsStore: { recycleBinEnabled, recycleBinKeep },
  } = useStores();

  return (
    <View style={$headerTip}>
      <Text
        style={{
          color: colors.secondaryLabel,
        }}
        tk="recycleBinSettingsScreen.tip"
        tkOptions={{
          duration: recycleBinKeep ?? 15,
        }}
      />

      {!recycleBinEnabled && (
        <Text
          style={[
            $enabledTip,
            {
              color: colors.secondaryLabel,
            },
          ]}
          tk="recycleBinSettingsScreen.enableTip"
        />
      )}
    </View>
  );
});

const $headerTip: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 15,
  marginBottom: 25,
  paddingHorizontal: 10,
};

const $enabledTip: TextStyle = {
  marginTop: 4,
};
