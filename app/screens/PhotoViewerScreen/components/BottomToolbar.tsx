import React, { useMemo } from 'react';
import { SFSymbol } from 'react-native-sfsymbols';

import { Toolbar, IToolbarItem } from '@/components/Toolbar';
import { translate } from '@/i18n';
import { FetchPhotosResult } from '@/services/local';
import { MorePopoverMenu } from './MorePopoverMenu';
import { Colors, useTheme } from '@/theme';

const t = translate;

interface BottomToolbarProps {
  visible: boolean;
  disabled: boolean;
  item: FetchPhotosResult;
}

export function BottomToolbar(props: BottomToolbarProps) {
  const { colors } = useTheme();
  const list = useMemo(() => getList(props), [props]);

  return <Toolbar visible={props.visible} disabled={props.disabled} list={list} />;
}

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
        <MorePopoverMenu disabled={disabled} item={props.item} onChange={props.onChange}>
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
