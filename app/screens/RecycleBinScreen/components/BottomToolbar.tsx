import React, { useCallback, useContext, useMemo } from 'react';

import { Toolbar, IToolbarItem } from '@/components/Toolbar';
import { t } from '@/i18n';
import { SelectionContext, SelectionContextValue } from '../context';
import { useDeletePhotos } from '../helpers/useDeletePhotos';
import { useRecoverPhotos } from '../helpers/useRecoverPhotos';

interface BottomToolbarProps {
  onDone: () => void;
}

export function BottomToolbar(props: BottomToolbarProps) {
  const selection = useContext(SelectionContext);
  const list = useMemo(() => getList(selection), [selection]);

  const deletePhotos = useDeletePhotos();
  const recoverPhotos = useRecoverPhotos();

  const handlePressItem = useCallback(
    (key: BottomToolbarKeys) => {
      const ids = selection.items.map((item) => item.id);
      const isAll = !selection.items.length;

      switch (key) {
        case BottomToolbarKeys.Delete:
          deletePhotos({ ids, is_all: isAll }, props.onDone);
          break;
        case BottomToolbarKeys.Recover:
          recoverPhotos({ ids, is_all: isAll }, props.onDone);
          break;
      }
    },
    [selection],
  );

  return <Toolbar visible={selection.enabled} list={list} onPress={handlePressItem} />;
}

function getList(selection: SelectionContextValue): IToolbarItem[] {
  return [
    {
      title: selection.items.length
        ? t('wastebasketScreen.recover')
        : t('wastebasketScreen.recoverAll'),
      key: BottomToolbarKeys.Recover,
    },
    {
      title: selection.items.length
        ? t('wastebasketScreen.delete')
        : t('wastebasketScreen.deleteAll'),
      key: BottomToolbarKeys.Delete,
    },
  ];
}

enum BottomToolbarKeys {
  Recover = 'recover',
  Delete = 'delete',
}
