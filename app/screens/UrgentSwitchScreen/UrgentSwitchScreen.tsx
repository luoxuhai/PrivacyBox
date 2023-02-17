import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Linking, ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Check as IconCheck } from 'iconoir-react-native';

import { SettingStackParamList } from '@/navigators';
import { Screen, ListSection, ListCell, Switch, ScrollSafeAreaView } from '@/components';
import { spacing, useTheme } from '@/theme';
import { ICON_CHECK_SIZE } from '@/constants';
import { getUrgentOptions } from './utils';
import { useStores } from '@/models';
import { UrgentSwitchActions } from '@/models/SettingsStore';
import { t, TextKeyPath } from '@/i18n';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HapticFeedback } from '@/utils';
import { AppQueriesSchemes } from './type';
import { canUsePremium } from '@/utils/canUsePremium';

export const UrgentSwitchScreen: FC<StackScreenProps<SettingStackParamList, 'UrgentSwitch'>> =
  observer(function UrgentSwitchScreen() {
    const { colors } = useTheme();
    const { settingsStore } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const options = useMemo(() => getUrgentOptions(colors), [colors]);

    async function handleSelectTarget(value: AppQueriesSchemes) {
      if (!canUsePremium()) {
        return;
      }

      HapticFeedback.selection();

      try {
        const res = await Linking.canOpenURL(value);
        if (!res) {
          Alert.alert(t('urgentSwitchScreen.uninstall'));
          return;
        }

        settingsStore.setUrgentSwitchTarget(value);
      } catch (error) {
        Alert.alert(t('urgentSwitchScreen.openFail'));
      }
    }
    return (
      <Screen type="tabView">
        <ScrollSafeAreaView
          contentContainerStyle={[
            $contentContainer,
            {
              paddingBottom: bottomTabBarHeight,
            },
          ]}
        >
          <ListSection
            titleTk="urgentSwitchScreen.targetHeader"
            descriptionTk="urgentSwitchScreen.targetTip"
          >
            {options.map((option) => {
              const isChecked = option.value === settingsStore.urgentSwitchTarget;
              return (
                <ListCell
                  key={option.title}
                  tk={option.title}
                  leftIcon={option.icon}
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
                  onPress={() => handleSelectTarget(option.value)}
                />
              );
            })}
          </ListSection>
          <UrgentSwitchActionSection />
        </ScrollSafeAreaView>
      </Screen>
    );
  });

const UrgentSwitchActionSection = observer(() => {
  const { settingsStore } = useStores();

  return (
    <ListSection titleTk="urgentSwitchScreen.actionSectionTitle">
      {actions.map((item) => {
        const checked = settingsStore.urgentSwitchActions.includes(item.value);
        return (
          <ListCell
            key={item.value}
            tk={item.tk}
            rightIcon={
              <Switch
                value={checked}
                disabled={checked && settingsStore.urgentSwitchActions.length === 1}
                onValueChange={(value) => {
                  if (value) {
                    settingsStore.setUrgentSwitchActions(item.value);
                  } else {
                    settingsStore.removeUrgentSwitchAction(item.value);
                  }
                }}
              />
            }
          />
        );
      })}
    </ListSection>
  );
});

const actions: { value: UrgentSwitchActions; tk: TextKeyPath }[] = [
  {
    value: UrgentSwitchActions.FaceDown,
    tk: 'urgentSwitchScreen.actionFaceDown',
  },
  {
    value: UrgentSwitchActions.Shake,
    tk: 'urgentSwitchScreen.actionShake',
  },
];

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};
