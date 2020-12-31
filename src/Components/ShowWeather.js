import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { getLocation } from "../services/getLocation";
import { forecast } from "../services/forecast";
import { windDirection } from "../services/windDirection";
import {
  unixToStandard,
  unixToStandardFull,
  unixToStandard12Hrs,
} from "../services/unixToStandard";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
    textAlign: "left",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: "30px",
    color: theme.palette.text.secondary,
  },
  address: {
    color: "#0c6ded",
    textAlign: "center",
  },
  loader: {
    margin: "auto",
    textAlign: "center",
  },
}));

export const ShowWeather = () => {
  const classes = useStyles();

  const [global, setGlobal] = useContext(GlobalContext);
  let [location, setLocation] = useState(
    "Peshawar, Khyber Pakhtunkhwa, Pakistan"
  );
  let [forecastRes, setForecastRes] = useState();

  useEffect(() => {
    async function fetchLocation() {
      const location = await getLocation(global.address);
      setLocation(location);
    }
    fetchLocation();
  }, [global.address]);
  useEffect(() => {
    if (location) {
      async function fetchForecast() {
        const gforecast = await forecast(location.latitude, location.longitude);
        setForecastRes(gforecast);
      }
      fetchForecast();
    }
  }, [location]);
  // console.log(forecastRes);

  if (location && forecastRes && forecastRes.current) {
    return (
      <div className={classes.root}>
        <h2 className={classes.address}>{location.place}</h2>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <h3 className={classes.h2}>Currenly</h3>
              <p>
                <i class="fas fa-thermometer-quarter fa-2x"></i>
                &nbsp;&nbsp;
                <span class="textBig black">
                  {forecastRes.current.temp}
                  &deg;&nbsp;C
                </span>
              </p>
              <div class="d-flex">
                <p>Weather: &nbsp;</p>
                <img
                  src={`images/${forecastRes.current.weather[0].main}.jpg`}
                  alt="weather"
                  width="40px"
                />
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <p>Humidity: {forecastRes.current.humidity}%</p>
              <p>
                Wind speed: {forecastRes.current.wind_speed}{" "}
                {windDirection(forecastRes.current.wind_deg)}
              </p>
              <p>Dew Point: {forecastRes.current.dew_point}&deg; C</p>
            </Grid>
            <Grid item sm={4} xs={6}>
              <p>Sunrise: {unixToStandard(forecastRes.current.sunrise)}</p>
              <p>Sunset: {unixToStandard(forecastRes.current.sunset)}</p>
              <p>Pressure: {forecastRes.current.pressure} hpa</p>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} class="hourlyGrid">
              <h3 className={classes.h3}>Hourly</h3>
              <div class="hourlyReportWraperParent">
                {forecastRes.hourly.map((val, ind, arr) => {
                  if (ind > 0 && ind < 16) {
                    return (
                      <div class="hourlyReportWraper">
                        <h4 id="ind">
                          <i class="far fa-clock"></i>{" "}
                          {unixToStandard12Hrs(val.dt)}
                        </h4>
                        <div class="col">
                          <p>
                            <i class="fas fa-thermometer-quarter"></i>
                            &nbsp;
                            {val.temp}
                            &deg;&nbsp;C
                          </p>
                          <div class="d-flex">
                            <p>Weather: &nbsp;</p>
                            <img
                              src={`images/${val.weather[0].main}.jpg`}
                              alt="weather"
                              width="40px"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <p>Humidity: {val.humidity}%</p>
                          <p>
                            Wind speed: {val.wind_speed}{" "}
                            {windDirection(val.wind_deg)}
                          </p>
                          <p>Dew Point: {val.dew_point}&deg; C</p>
                        </div>
                        <div class="dividerVertical"></div>
                      </div>
                    );
                  }
                })}
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <h3 className={classes.h3}>8 Days Report</h3>
              {forecastRes.daily.map((val, ind, arr) => {
                if (ind > 0) {
                  return (
                    <div>
                      <h4 id="ind">{unixToStandardFull(val.dt)}</h4>
                      <Grid container>
                        <Grid item sm={4} xs={12}>
                          <p>
                            <i class="fas fa-thermometer-quarter"></i>
                            &nbsp;
                            {val.temp.min} / {val.temp.max}
                            &deg;&nbsp;C
                          </p>
                          <div class="d-flex">
                            <p>Weather: &nbsp;</p>
                            <img
                              src={`images/${val.weather[0].main}.jpg`}
                              alt="weather"
                              width="40px"
                            />
                          </div>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                          <p>Humidity: {val.humidity}%</p>
                          <p>
                            Wind speed: {val.wind_speed}{" "}
                            {windDirection(val.wind_deg)}
                          </p>
                          <p>Dew Point: {val.dew_point}&deg; C</p>
                        </Grid>

                        <Grid item sm={4} xs={6}>
                          <p>Sunrise: {unixToStandard(val.sunrise)}</p>
                          <p>Sunset: {unixToStandard(val.sunset)}</p>
                          <p>Pressure: {val.pressure} hpa</p>
                        </Grid>
                      </Grid>
                      <div class="divider"></div>
                    </div>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
  if (location) {
    return (
      <div className={classes.root}>
        <h2 className={classes.address}>{location.place}</h2>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.loader}>
                <CircularProgress />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <h2 class="error">Please enter valid location!</h2>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
