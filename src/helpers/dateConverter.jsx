import moment from 'moment';

 const dateConverter = (date) => {
    return moment(date).format('MMMM Do YYYY, hh:mm')
}

export default dateConverter