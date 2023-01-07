import React from 'react';

import { HeaderTitle } from '@/components';
import { formatDate } from '@/utils';

interface HeaderPhotoDetailProps {
  name: string;
  ctime: number;
}

export function HeaderPhotoDetail(props: HeaderPhotoDetailProps) {
  return <HeaderTitle title={props.name} subtitle={formatDate(props.ctime)} />;
}
