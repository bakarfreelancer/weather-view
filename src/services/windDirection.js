export const windDirection = (a) => {
  if (a < 10) {
    return "N";
  } else if (a < 80) {
    return "NE";
  } else if (a < 100) {
    return "E";
  } else if (a < 170) {
    return "SE";
  } else if (a < 190) {
    return "S";
  } else if (a < 260) {
    return "SW";
  } else if (a < 280) {
    return "W";
  } else {
    return "NW";
  }
};
