import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formGrid: {
    width: "fit-content",
    margin: "auto",
  },
  searchInput: {
    width: "300px",
  },
  searchButton: {
    backgroundImage: "linear-gradient(to bottom right,#0c6ded, #7aecfc)",
    color: "#fff",
  },
}));

export default function Search() {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [global, setGlobal] = useContext(GlobalContext);
  const updateAddress = (e) => {
    setAddress(e.target.value);
  };
  const getAddress = () => {
    setGlobal({ address });
    setAddress("");
  };

  return (
    <div>
      <div className={classes.margin}>
        <Grid
          container
          spacing={1}
          className={classes.formGrid}
          alignItems="flex-end">
          <Grid item>
            <LocationOnOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField
              name="address"
              value={address}
              onChange={updateAddress}
              label="Enter city name"
              className={classes.searchInput}
            />
          </Grid>
          <Grid item>
            <Button onClick={getAddress} className={classes.searchButton}>
              <SearchOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
