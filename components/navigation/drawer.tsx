import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { NavContext } from "./index";

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    width: 250,
  },
}));

const DrawerContainer = () => {
  const classes = useStyles();
  const value = useContext(NavContext);
  const { toogleDrawer, isActive } = value;
  return (
    <Drawer anchor="left" open={isActive} onClose={toogleDrawer}>
      <List
        aria-labelledby="nested-list-subheader"
        className={classes.list}
      ></List>
    </Drawer>
  );
};

export default DrawerContainer;
