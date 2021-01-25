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
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { handleDateChange, DateT } from "data/dateSlice";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { setFlags } from "data/modalSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: theme.palette.background.paper,
  },
  date: {
    "& input": {
      display: "none",
    },
    "& .MuiInput-underline::before": {
      display: "none",
    },
    "& .MuiInputAdornment-root": {
      height: "100%",
      marginTop: "7.5px",
    },
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  enum menuItemType {
    exercise = "exercise",
    routine = "routine",
  }

  const handleMenuItemClick = (type: menuItemType) => {
    if (type === menuItemType.exercise) {
      dispatch(setFlags({ addExerciseToTrainingFlag: true }));
    } else if (type === menuItemType.routine) {
      dispatch(setFlags({ addRoutineToTrainingFlag: true }));
    }

    handleClose();
  };

  const classes = useStyles();

  const DateState = useSelector<DateT, DateT["date"]>((state) => state.date);

  const dispatch = useDispatch();
  const handleChange = (date: Date | null) => {
    if (date) {
      const stringifyDate = date.toISOString().slice(0, 10);
      dispatch(handleDateChange({ date: stringifyDate }));
    }
  };

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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="none"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={DateState.date.date}
              onChange={handleChange}
              className={classes.date}
            />
          </MuiPickersUtilsProvider>

          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          <IconButton onClick={handleClick}>
            <AddIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => handleMenuItemClick(menuItemType.exercise)}
            >
              From the exercises
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(menuItemType.routine)}>
              From the routines
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
