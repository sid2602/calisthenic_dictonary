import { Routine } from "types/routine";
import { useState } from "react";
import {
  CardActions,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    cardAction: {
      padding: "0",
      position: "absolute",
    },
    cardContent: {
      cursor: "pointer",
    },

    typography: {
      textAlign: "center",
      padding: "3rem 0 2.8rem",
    },

    grid: {
      maxWidth: "200px",
    },
  })
);

type Props = {
  routine: Routine;
};

const RoutinesList = ({ routine }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={5} className={classes.grid}>
      <Card className={classes.card}>
        <CardActions className={classes.cardAction}>
          <IconButton
            aria-controls="fade-menu"
            aria-label="settings"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Remove</MenuItem>
          </Menu>
        </CardActions>

        <CardContent
          onClick={() => console.log("something")}
          className={classes.cardContent}
        >
          <Typography
            variant="h5"
            component="h2"
            className={classes.typography}
          >
            {routine.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RoutinesList;
