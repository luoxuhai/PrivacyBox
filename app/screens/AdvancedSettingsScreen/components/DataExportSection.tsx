import React from 'react';
import { observer } from 'mobx-react-lite';
import Share from 'react-native-share';
import mime from 'mime';
import { useMutation } from '@tanstack/react-query';
import {  readdir, stat, unlink } from 'react-native-fs';

import { ListSection, ListCell } from '@/components';
import { t } from '@/i18n';
import { generateUUID, LocalPathManager, Overlay, reportException, showActionSheet } from '@/utils';
import { exportPhotos } from '@/screens/PhotosScreen/helpers/exportPhotos';
import { fetchAllPhotoUris } from '../helpers/fetchAllPhotoUris';
import { fetchAllFileUris } from '../helpers/fetchAllFileUris';
import { join, parse } from '@/lib/path';
import { getPhotoTypeByMime } from '@/utils/getFileTypeByMime';
import { IResult, transformPhotoFromUri } from '@/screens/PhotosScreen/helpers/PhotoImporter';
import { addPhotos, createAlbum } from '@/services/local';
import { PhotoTypes } from '@/database/entities/types';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

export const DataExportSection = observer(() => {
  const { mutateAsync: handleExport } = useMutation({
    async mutationFn() {
      Overlay.alert({ preset: 'spinner', duration: 0 });

      const uris: string[] = [];
      const dirs = await readdir(LocalPathManager.photoPath);
      for (const dir of dirs) {
        try {
          const isExists = await AppDataSource.manager.exists(Photo, {
            where: {
              id: dir,
            },
          });

          if (isExists) {
            continue;
          }

          const subDirs = await readdir(join(LocalPathManager.photoPath, dir));
          const sourceName = subDirs.filter(
            (item) => !['thumbnail.jpg', 'poster.jpg'].includes(item),
          )?.[0];
          if (!sourceName) {
            continue;
          }

          const sourceUri = join(LocalPathManager.photoPath, dir, sourceName);

          if ((await stat(sourceUri)).size > 0) {
            uris.push(sourceUri);
          }
        } catch (error) {
          console.error(error);
        }
      }

      const albumId = generateUUID();
      await createAlbum({
        id: albumId,
        name: `导出-${Date.now()}`,
        is_fake: false,
      });

      for (const uri of uris) {
        const { ext, base: filename, dir } = parse(uri);
        const mimeType = mime.getType(ext.replace('.', ''));
        const type = getPhotoTypeByMime(mimeType);

        try {
          const info = (await transformPhotoFromUri(
            uri,
            type === PhotoTypes.Video,
            true,
          )) as IResult;

          await addPhotos({
            album_id: albumId,
            is_fake: false,
            photos: [
              {
                uri,
                name: filename,
                mime: mimeType,
                ...info,
              },
            ],
          });
          unlink(dir);
        } catch (error) {
          reportException({ error, message: 'DataExportSection:addPhotos' });
          console.error(error);
        }
      }
    },
    onSuccess() {
      Overlay.toast({
        preset: 'done',
        title: t('photosScreen.export.success'),
      });
    },
    onError(error) {
      Overlay.toast({
        preset: 'error',
        title: t('photosScreen.export.fail'),
        message: error?.message || '',
      });
    },
  });

  function handleExportToFile(urls: string[]) {
    if (!urls?.length) {
      return null;
    }

    return Share.open({
      urls: urls.map((uri) => encodeURI(uri)),
      saveToFiles: true,
    });
  }

  function handleSelectDest() {
    showActionSheet(
      {
        title: t('advancedSettingsScreen.dest.title'),
        options: [
          t('advancedSettingsScreen.dest.album'),
          t('advancedSettingsScreen.dest.file'),
          t('common.cancel'),
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
      },
    );
  }

  return (
    <ListSection titleTk="advancedSettingsScreen.dataExport">
      <ListCell tk="advancedSettingsScreen.exceptionDataExport" onPress={() => handleExport()} />
      <ListCell tk="advancedSettingsScreen.allPhotoExport" onPress={() => handleSelectDest()} />
      <ListCell
        tk="advancedSettingsScreen.allFileExport"
        bottomSeparator={false}
        onPress={async () => handleExportToFile(await fetchAllFileUris())}
      />
    </ListSection>
  );
});
