import dayjs from 'dayjs';

export const formatDate = (timestamp: number, dateFormat?: string) => {
  return dayjs(timestamp).format(dateFormat ?? 'YYYY-MM-DD');
};
