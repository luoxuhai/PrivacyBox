import React, { useContext, useMemo } from 'react';

import { Toolbar, IToolbarItem } from '@/components/Toolbar';
import { t } from '@/i18n';
import { FetchPhotosResult } from '@/services/local';
import { useTheme } from '@/theme';
import { SelectionContext } from '../context';

interface BottomToolbarProps {
  visible: boolean;
  disabled: boolean;
  items: FetchPhotosResult[];
}

export function BottomToolbar(props: BottomToolbarProps) {
  const { colors } = useTheme();
  const list = useMemo(getList, []);

  const selection = useContext(SelectionContext);

  return <Toolbar visible={props.visible} disabled={props.disabled} list={list} />;
}

function getList(): IToolbarItem[] {
  return [
    {
      title: t('common.share'),
      key: BottomToolbarKeys.Share,
      icon: 'square.and.arrow.up',
    },
    {
      title: t('filesScreen.saveToLocal'),
      key: BottomToolbarKeys.Details,
      icon: 'square.and.arrow.down',
    },
    {
      title: t('filesScreen.move'),
      key: BottomToolbarKeys.Delete,
      icon: 'photo.on.rectangle.angled',
    },
    {
      title: t('common.delete'),
      key: BottomToolbarKeys.More,
      icon: 'trash',
    },
  ];
}

enum BottomToolbarKeys {
  Share = 'share',
  Details = 'details',
  Delete = 'delete',
  More = 'more',
}
