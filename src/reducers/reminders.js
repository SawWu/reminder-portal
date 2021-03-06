import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';
import moment from 'moment'

const reminder = (action) => {
  const {text} = action;
  return {
    id: Math.random(),
    text,
    time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  }
};

const reminders = (state = read_cookie("reminders") || [], action = {}) => {
  let reminders = null;
  switch (action.type) {
    case ADD_REMINDER:
      reminders = [
        ...state,
        reminder(action)
      ];
      bake_cookie("reminders", reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = state.filter(reminder => reminder.id !== action.id);
      bake_cookie("reminders", reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie("reminders", reminders);
      return reminders;
    default:
      return state;
  }
};


export default reminders;
