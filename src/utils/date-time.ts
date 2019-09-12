import { format } from 'date-fns';

export const formatHHmmss = (date: Date | string | number) => {
  if (new Date(date).toString() === 'Invalid Date') {
    return 'Invalid Date';
  }
  return format(new Date(date), 'HH:mm:ss');
};

export const formatYYYYMMDD = (date: Date | string | number) => {
  if (new Date(date).toString() === 'Invalid Date') {
    return 'Invalid Date';
  }
  return format(new Date(date), 'yyyy-MM-dd');
};
