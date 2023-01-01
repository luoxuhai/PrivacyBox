import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import numeral from 'numeral';

dayjs.extend(durationPlugin);

export const formatDuration = (duration: number) => {
  const formatStr = (numeral(duration).divide(1000).value() ?? 0) >= 3600 ? 'HH:mm:ss' : 'mm:ss';
  return dayjs.duration(duration).format(formatStr);
};
