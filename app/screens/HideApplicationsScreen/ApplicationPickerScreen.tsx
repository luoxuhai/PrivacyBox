import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { Screen, ExitButton } from '@/components';
import { FamilyActivityPicker } from '@/lib/ScreenTime';
import { useStores } from '@/models';

export const ApplicationPickerScreen: FC<
  StackScreenProps<MoreFeatureNavigatorParamList, 'ApplicationPicker'>
> = observer((props) => {
  const { settingsStore } = useStores();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <ExitButton
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  return (
    <Screen statusBarStyle="inverted">
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <FamilyActivityPicker
          style={{
            flex: 1,
          }}
          onActivityChange={settingsStore.setSelectedAppCount}
        />
      </SafeAreaView>
    </Screen>
  );
});
