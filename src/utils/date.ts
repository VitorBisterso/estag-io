import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export function formatDate(date: string) {
   return moment(date).format('DD/MM/YYYY');
}
