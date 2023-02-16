import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { observer } from 'mobx-react-lite';

import { ListSection, ListCell } from '@/components';
import { useTheme } from '@/theme';
import { t } from '@/i18n';
import { useMutation } from '@tanstack/react-query';
import { LocalPathManager, Overlay } from '@/utils';
import { clearOldData } from '@/screens/DataMigratorScreen/helpers/clearOldData';
import { exists, readdir, readDir, unlink } from 'react-native-fs';
import { join } from '@/lib/path';
import { recycleBinClearerTask } from '@/utils/task/recycleBinClearer';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

export const CacheClearSection = observer(() => {
  const { colors } = useTheme();

  const { mutateAsync } = useMutation({
    async mutationFn() {
      Overlay.alert({ preset: 'spinner', duration: 0 });

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
        preset: 'done',
        title: t('advancedSettingsScreen.clear.success'),
      });
    },
    onError(error) {
      Overlay.toast({
        preset: 'error',
        title: t('advancedSettingsScreen.clear.fail'),
        message: error?.message || '',
      });
    },
  });

  const handleClearCache = useCallback((_: any) => {
    Alert.alert(t('advancedSettingsScreen.clear.title'), '', [
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
      {
        text: t('common.confirm'),
        onPress() {
          mutateAsync();
        },
      },
    ]);
  }, []);

  return (
    <ListSection>
      <ListCell
        textStyle={{
          color: colors.palette.primary6,
        }}
        tk="advancedSettingsScreen.clear.title"
        rightIcon={null}
        bottomSeparator={false}
        onPress={handleClearCache}
      />
    </ListSection>
  );
});
