/*
 * @copyRight by iHealthScreen
 */
import moment from 'moment';
//
export const showDate = dt => {
  console.log('dt', dt);
  return moment.utc(dt).format('D MMM YYYY');
};
