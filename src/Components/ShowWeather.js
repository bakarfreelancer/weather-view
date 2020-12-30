import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { getLocation } from "../services/getLocation";
import { forecast } from "../services/forecast";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
    textAlign: "left",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  address: {
    color: "#0c6ded",
    textAlign: "center",
  },
}));

export const ShowWeather = () => {
  const classes = useStyles();

  const [global, setGlobal] = useContext(GlobalContext);
  let [location, setLocation] = useState("Islamabad pakistan");
  let [forecastRes, setForecastRes] = useState(33.7, 73.1);
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
  console.log(forecastRes);
  if (location && forecastRes && forecastRes.current) {
    return (
      <div className={classes.root}>
        <h2 className={classes.address}>{location.place}</h2>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <h3 className={classes.h2}>Currenly</h3>
            <p>
              <i class="fas fa-thermometer-quarter fa-2x"></i>
              &nbsp;&nbsp;
              {forecastRes.current.temp}
              &nbsp; &deg;C
            </p>
          </Grid>
          <Grid item sm={6} xs={12}></Grid>
        </Grid>
        Temperature is
      </div>
    );
  }
  if (location) {
    return <div>{location.place}</div>;
  }
  return <div>Search valid location</div>;
};
