import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { NavContext } from "./index";
import ListComponent from "./list";
import { Typography } from "@material-ui/core";
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
      <List aria-labelledby="nested-list-subheader" className={classes.list}>
        {/* <Typography variant="h6">
          <a href="/">Calisthenic Dictonary</a>
        </Typography> */}
        <ListComponent />
      </List>
    </Drawer>
  );
};

export default DrawerContainer;
