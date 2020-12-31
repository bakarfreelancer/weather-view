export const unixToStandard = (time) => {
  let date = new Date(time * 1000);
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();
  return `${hours.substr(-2)}:${minutes.substr(-2)}`;
};
export const unixToStandardFull = (time) => {
  let date = new Date(time * 1000);
  return date.toDateString();
};
export const unixToStandard12Hrs = (time) => {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let amPm = "AM";
  if (hours == 0) {
    hours = 12;
  } else if (hours == 12) {
    amPm = "PM";
  } else if (hours > 12) {
    hours -= 12;
    amPm = "PM";
  }
  hours = "0" + hours;
  return `${hours.substr(-2)}:${minutes.substr(-2)} ${amPm}`;
};
