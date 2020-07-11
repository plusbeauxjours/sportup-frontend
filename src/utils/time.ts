import moment from 'moment';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const timeSince = dateString => {
  const date = new Date(dateString);

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 86400);
  if (interval > 2) {
    return (
      ('0' + date.getDate().toString()).slice(-2) +
      months[date.getMonth()] +
      date
        .getFullYear()
        .toString()
        .slice(-2)
    );
  }
  if (interval > 0) {
    return `${interval}d`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval}h`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval}m`;
  }
  return `${Math.floor(seconds)}s`;
};


export const formatDate = date =>
  moment(date, 'YYYY-MM-DD').format('ddd, Do MMM YYYY');

export const formatTime = time => moment(time, 'HH:mm:ss').format('h:mm A');