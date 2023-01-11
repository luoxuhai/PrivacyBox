import React, { useMemo, useCallback } from 'react';
import { SheetManager } from 'react-native-actions-sheet';
import { observer } from 'mobx-react-lite';

import { Toolbar, IToolbarItem } from '@/components/Toolbar';
import { translate } from '@/i18n';
import { FetchPhotosResult } from '@/services/local';
import { MorePopoverMenu } from './MorePopoverMenu';
import { sharePhotos } from '@/screens/PhotosScreen/helpers/sharePhotos';
import { useDeletePhotos } from '@/screens/PhotosScreen/helpers/useDeletePhotos';

const t = translate;

interface BottomToolbarProps {
  visible: boolean;
  disabled: boolean;
  item: FetchPhotosResult;
}

export const BottomToolbar = observer((props: BottomToolbarProps) => {
  const list = useMemo(() => getList(props), [props]);

  const handleDeletePhotos = useDeletePhotos();

  const handlePressItem = useCallback(
    (key: BottomToolbarKeys) => {
      const uris = [props.item.uri];
      const ids = [props.item.id];

      switch (key) {
        case BottomToolbarKeys.Share:
          sharePhotos({ uris });
          break;
        case BottomToolbarKeys.Delete:
          handleDeletePhotos({ ids });
          break;
        case BottomToolbarKeys.Details:
          SheetManager.show('photo-detail-sheet', {
            payload: {
              item: props.item,
            },
          });
          break;
      }
    },
    [props.item],
  );

  return (
    <>
      <Toolbar
        visible={props.visible}
        disabled={props.disabled}
        list={list}
        onPress={handlePressItem}
      />
    </>
  );
});

function getList(props: BottomToolbarProps): IToolbarItem[] {
  return [
    {
      title: t('common.share'),
      key: BottomToolbarKeys.Share,
      icon: 'square.and.arrow.up',
    },
    {
      title: t('filesScreen.detail.title'),
      key: BottomToolbarKeys.Details,
      icon: 'info.circle',
    },
    {
      title: t('common.delete'),
      key: BottomToolbarKeys.Delete,
      icon: 'trash',
    },
    {
      title: t('photoViewerScreen.bottomToolbar.more'),
      key: BottomToolbarKeys.More,
      icon: 'ellipsis.circle',
      type: 'menu',
      PopoverMenu: ({ children, disabled }) => (
        <MorePopoverMenu disabled={disabled} item={props.item}>
          {children}
        </MorePopoverMenu>
      ),
    },
  ];
}

enum BottomToolbarKeys {
  Share = 'share',
  Details = 'details',
  Delete = 'delete',
  More = 'more',
}
