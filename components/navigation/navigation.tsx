import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Box from "@material-ui/core/Box";
import { Icon } from "@material-ui/core";

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
    width: 150,
  },
  iconContainerRight: {
    textAlign: "right",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: "1.4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
}));

const Navigation = () => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box className={classes.iconContainer}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" className={classes.title}>
            Calisthenic Dictonary
          </Typography>

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
    </nav>
  );
};

export default Navigation;
