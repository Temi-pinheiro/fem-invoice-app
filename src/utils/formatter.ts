import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

export const getFormattedDate = (date: string | undefined | Date) => {
  if (!date) return '';
  return dayjs(date).format('DD MMM YYYY');
};
export const getFullMoney = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

export const getInputDate = (date: any) => dayjs(date).format('YYYY-MM-DD');
