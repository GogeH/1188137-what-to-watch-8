import dayjs from 'dayjs';

export const datetime = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
export const humanizedDateTime = (date: Date): string => dayjs(date).format('MMMM D, YYYY');
