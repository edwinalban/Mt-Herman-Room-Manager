import dayjs from 'dayjs';

export const formatDate = (date) => {
    const formattedDate = dayjs(date).format('MM/DD/YYYY hh:mm:ss A');
    return formattedDate
}