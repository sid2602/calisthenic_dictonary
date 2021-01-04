import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Box from "@material-ui/core/Box";
import { NavContext } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: theme.palette.background.paper,
  },

  menuButton: {
    // [theme.breakpoints.up("lg")]: {
    //   display: "none",
    // },
  },
  iconContainer: {
    flex: 1,
  },
  iconContainerRight: {
    textAlign: "right",
  },
}));

const Navigation = () => {
  const classes = useStyles();

  const value = useContext(NavContext);
  const { toogleDrawer, isActive } = value;

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Box className={classes.iconContainer}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toogleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          className={`${classes.iconContainerRight} ${classes.iconContainer}`}
        >
          <IconButton>
            <DateRangeIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
