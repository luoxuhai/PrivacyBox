import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Share from "react-native-share";

import { SettingStackParamList } from "@/navigators";
import {
  Screen,
  SafeAreaScrollView,
  ListSection,
  ListCell,
  Switch,
} from "@/components";
import { spacing, useTheme } from "@/theme";
import { t, TextKeyPath } from "@/i18n";
import { BottomTabs } from "@/models/SettingsStore";
import { useStores } from "@/models";
import { classifyImageTask } from "@/utils/task/classifyImageTask";
import { canUsePremium } from "@/utils/canUsePremium";
import { useMutation } from "@tanstack/react-query";
import { LocalPathManager, Overlay, showActionSheet } from "@/utils";
import { clearOldData } from "../DataMigratorScreen/helpers/clearOldData";
import { exportPhotos } from "../PhotosScreen/helpers/exportPhotos";
import { fetchAllPhotoUris } from "./helpers/fetchAllPhotoUris";
import { fetchAllFileUris } from "./helpers/fetchAllFileUris";
import { exists, readdir, readDir, unlink } from "react-native-fs";
import { SOURCE_PATH } from "../DataMigratorScreen/constants";
import { join } from "@/lib/path";
import { recycleBinClearerTask } from "@/utils/task/recycleBinClearer";

export const AdvancedSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, "AdvancedSettings">
> = observer(function AdvancedSettingsScreen() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { settingsStore } = useStores();

  function handleSmartSearchEnabled(enabled: boolean) {
    if (enabled && !canUsePremium()) {
      return;
    }

    settingsStore.setSmartSearchEnabled(enabled);
    if (enabled) {
      classifyImageTask.start();
    }
  }

  return (
    <Screen type="tabView">
      <SafeAreaScrollView
        contentContainerStyle={[
          $contentContainer,
          { paddingBottom: bottomTabBarHeight },
        ]}
      >
        <ListSection descriptionTk="advancedSettingsScreen.importImageAfterDeleteTip">
          <ListCell
            tk="advancedSettingsScreen.importImageAfterDelete"
            bottomSeparator={false}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={settingsStore.autoDeleteOriginEnabled}
                onValueChange={settingsStore.setAutoDeleteOriginEnabled}
              />
            }
          />
        </ListSection>
        <ListSection descriptionTk="advancedSettingsScreen.smartSearchTip">
          <ListCell
            tk="advancedSettingsScreen.smartSearch"
            bottomSeparator={false}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={settingsStore.smartSearchEnabled}
                onValueChange={handleSmartSearchEnabled}
              />
            }
          />
        </ListSection>
        <BottomTabVisibleSection />
        <DataExportSection />
        <CacheClearSection />
      </SafeAreaScrollView>
    </Screen>
  );
});

const BottomTabVisibleSection = observer(() => {
  const { settingsStore } = useStores();

  return (
    <ListSection titleTk="advancedSettingsScreen.bottomTabVisible">
      {list.map((item, idx) => {
        const bottomSeparator = idx < list.length - 1;
        const checked = settingsStore.visibleBottomTabs.includes(item.value);
        const disabled =
          checked && settingsStore.visibleBottomTabs.length === 1;

        return (
          <ListCell
            key={item.title}
            tk={item.title}
            bottomSeparator={bottomSeparator}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={checked}
                disabled={disabled}
                onValueChange={(v) => {
                  if (v) {
                    settingsStore.setVisibleBottomTabs(item.value);
                  } else {
                    settingsStore.removeVisibleBottomTabs(item.value);
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

const DataExportSection = observer(() => {
  const { mutateAsync: handleExport } = useMutation({
    async mutationFn() {
      Overlay.alert({ preset: "spinner", duration: 0 });
      const uris: string[] = [];
      const dirs = await readdir(LocalPathManager.photoPath);
      for (const dir of dirs) {
        try {
          const subDirs = await readdir(join(LocalPathManager.photoPath, dir));
          const sourceName = subDirs.filter(
            (item) => !["thumbnail.jpg", "poster.jpg"].includes(item)
          )?.[0];
          if (!sourceName) {
            continue;
          }

          const sourceUri = join(LocalPathManager.photoPath, dir, sourceName);

          if (await exists(sourceUri)) {
            uris.push(sourceUri);
          }
        } catch {}
      }

      let photos = [];
      for (const uri of uris) {
        const { ext, base: filename, dir } = parse(uri);
        const mimeType = mime.getType(ext.replace(".", ""));
        const type = getPhotoTypeByMime(mimeType);

        try {
          const info = (await transformPhotoFromUri(
            uri,
            type === PhotoTypes.Video,
            true
          )) as IResult;

          const photo = {
            uri,
            name: filename,
            mime: mimeType,
            ...info,
          };

          await addPhotos({
            album_id: query.album_id,
            is_fake: false,
            photos: [photo],
          });
          unlink(dir);
        } catch (error) {}
      }
    },
    onSuccess(data) {
      if (data?.success) {
        clearOldData();
      } else {
        throw data?.message;
      }
    },
    onError(error) {
      Overlay.toast({
        preset: "error",
        title: t("photosScreen.export.fail"),
        message: error?.message || "",
      });
    },
    onSettled() {
      Overlay.dismissAllAlerts();
    },
  });

  function handleExportToFile(urls: string[]) {
    if (!urls?.length) {
      return null;
    }

    return Share.open({
      urls,
      saveToFiles: true,
    });
  }

  function handleSelectDest() {
    showActionSheet(
      {
        title: t("advancedSettingsScreen.dest.title"),
        options: [
          t("advancedSettingsScreen.dest.album"),
          t("advancedSettingsScreen.dest.file"),
          t("common.cancel"),
        ],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        const urls = await fetchAllPhotoUris();
        switch (buttonIndex) {
          case 0:
            exportPhotos(urls);
            break;
          case 1:
            handleExportToFile(urls);
        }
      }
    );
  }

  return (
    <ListSection titleTk="advancedSettingsScreen.dataExport">
      <ListCell
        // visible={!!globalStore.migrationFailedUris?.length}
        tk="advancedSettingsScreen.exceptionDataExport"
        onPress={() => handleExport()}
      />
      <ListCell
        tk="advancedSettingsScreen.allPhotoExport"
        onPress={() => handleSelectDest()}
      />
      <ListCell
        tk="advancedSettingsScreen.allFileExport"
        bottomSeparator={false}
        onPress={async () => handleExportToFile(await fetchAllFileUris())}
      />
    </ListSection>
  );
});

const CacheClearSection = observer(() => {
  const { colors } = useTheme();

  const { mutateAsync: handleClearCache } = useMutation({
    async mutationFn() {
      clearOldData();
      recycleBinClearerTask.start();

      const dirs = await readdir(LocalPathManager.photoPath);
      for (const dir of dirs) {
        try {
          const exists = await AppDataSource.manager.exists(Photo, {
            where: {
              id: dir,
            },
          });

          if (!exists) {
            await unlink(join(LocalPathManager.photoPath, dir));
          }
        } catch {}
      }

      if (await exists(LocalPathManager.tempPath)) {
        const dirs = await readDir(LocalPathManager.tempPath);
        for (const dir of dirs) {
          if (dir.isFile()) {
            await unlink(dir.path);
          }
        }
      }
    },
    onSuccess() {
      Overlay.toast({
        preset: "done",
        title: t("advancedSettingsScreen.clear.success"),
      });
    },
    onError(error) {
      Overlay.toast({
        preset: "error",
        title: t("advancedSettingsScreen.clear.fail"),
        message: error?.message || "",
      });
    },
  });

  return (
    <ListSection>
      <ListCell
        textStyle={{
          color: colors.palette.primary6,
        }}
        tk="advancedSettingsScreen.clear.title"
        rightIcon={null}
        bottomSeparator={false}
        onPress={() => {
          Alert.alert('','', [{
            onPress: handleClearCache
          }])
        }}
      />
    </ListSection>
  );
});

const list: { title: TextKeyPath; value: BottomTabs }[] = [
  {
    title: "contentNavigator.filesTab",
    value: BottomTabs.Files,
  },
  {
    title: "contentNavigator.albumTab",
    value: BottomTabs.Album,
  },
  {
    title: "contentNavigator.moreTab",
    value: BottomTabs.More,
  },
];

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};
