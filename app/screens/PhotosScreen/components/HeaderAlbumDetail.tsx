import React from 'react';
import { HeaderTitle } from '@/components';
import { useAlbumDetail } from '../helpers/useAlbumDetail';
import { translate } from '@/i18n';
import { useDeepMemo } from '@/utils';

interface HeaderAlbumDetailProps {
  name: string;
  id: string;
}

export function HeaderAlbumDetail(props: HeaderAlbumDetailProps) {
  const { data } = useAlbumDetail(props.id);

  const subtitle = useDeepMemo(() => getSubtitle(data), [data]);

  return <HeaderTitle title={props.name} subtitle={subtitle} />;
}

function getSubtitle({
  photoCount,
  videoCount,
}: { photoCount?: number; videoCount?: number } = {}) {
  let subtitleText: string | undefined;
  const t = translate;

  if (photoCount && !videoCount) {
    subtitleText = t('photosScreen.subtitle.photo', {
      count: photoCount,
    });
  } else if (!photoCount && videoCount) {
    subtitleText = t('photosScreen.subtitle.video', {
      count: videoCount,
    });
  } else if (!photoCount && !videoCount) {
    subtitleText = undefined;
  } else {
    subtitleText = `${t('photosScreen.subtitle.photo', {
      count: photoCount,
    })}、${t('photosScreen.subtitle.video', { count: videoCount })}`;
  }

  return subtitleText;
}
