import React, { FC, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { Check as IconCheck } from 'iconoir-react-native';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch, Text } from '@/components';
import { spacing, useTheme } from '@/theme';
import { useStores } from '@/models';
import { t } from '@/i18n';
import { ICON_CHECK_SIZE } from '@/constants';
import { HapticFeedback } from '@/utils';
import { canUsePremium } from '@/utils/canUsePremium';

export const RecycleBinSettingsScreen: FC<
  StackScreenProps<MoreFeatureNavigatorParamList, 'RecycleBinSettings'>
> = observer(() => {
  const { settingsStore } = useStores();
  const { colors } = useTheme();

  const suffix = useMemo(() => t('recycleBinSettingsScreen.day'), [t]);
  const options = useMemo(
    () => [
      {
        value: 3,
        title: '3' + suffix,
      },
      {
        value: 15,
        title: '15' + suffix,
      },
      {
        value: 30,
        title: '30' + suffix,
      },
      {
        value: 60,
        title: '60' + suffix,
      },
      {
        value: 90,
        title: '90' + suffix,
      },
      {
        value: 120,
        title: '120' + suffix,
      },
    ],
    [suffix],
  );

  return (
    <Screen type="tabView">
      <SafeAreaScrollView contentContainerStyle={$contentContainer}>
        <ListSection titleTk="recycleBinSettingsScreen.enableHeader">
          <ListCell
            tk="recycleBinSettingsScreen.enableTitle"
            rightIcon={null}
            bottomSeparator={false}
            RightAccessory={
              <Switch
                value={settingsStore.recycleBinEnabled}
                onValueChange={(enabled) => {
                  settingsStore.setRecycleBin({ enabled });
                  HapticFeedback.selection();
                }}
              />
            }
          />
        </ListSection>
        <ListSection titleTk="recycleBinSettingsScreen.durationHeader">
          {options.map((option, index) => {
            const isChecked = option.value === settingsStore.recycleBinKeep;

            return (
              <ListCell
                key={option.title}
                text={option.title}
                rightIcon={
                  isChecked ? (
                    <IconCheck
                      width={ICON_CHECK_SIZE}
                      height={ICON_CHECK_SIZE}
                      color={colors.palette.primary6}
                      strokeWidth={2.5}
                    />
                  ) : null
                }
                bottomSeparator={index < options.length - 1}
                onPress={() => {
                  if (!canUsePremium()) {
                    return;
                  }

                  settingsStore.setRecycleBin({
                    keep: option.value,
                  });
                }}
              />
            );
          })}
        </ListSection>
      </SafeAreaScrollView>
      <Text text="recycleBinSettings" />
    </Screen>
  );
});

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};
