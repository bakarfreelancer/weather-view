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
