import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
const userLocale = navigator.language;
const currencyLocale = Intl.NumberFormat.supportedLocalesOf(userLocale, {
  style: 'currency',
  currency: 'NGN',
});

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