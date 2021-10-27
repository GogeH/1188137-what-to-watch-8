import dayjs from 'dayjs';

export const getDatetime = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
export const getHumanizedDateTime = (date: Date): string => dayjs(date).format('MMMM D, YYYY');
