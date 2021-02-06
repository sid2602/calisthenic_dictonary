import { makeStyles, Theme, createStyles, Box } from "@material-ui/core";
import { Quantity } from "types/training";
import { VariantType } from "types/exercises";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { openDialog, DialogType } from "data/dialogSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    series: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.4rem",

      "& span": {
        fontSize: "0.6rem",
        textAlgin: "center",
        width: "50px",
        [theme.breakpoints.down("sm")]: {
          margin: "1rem 0 0.4rem 0",
        },
      },
    },

    button: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      outline: "none",
      padding: "0 5px 0 0",
    },

    span: {
      fontSize: "0.6rem",
      textAlgin: "center",
      width: "50px",
      margin: "0 0 5px 0",
      [theme.breakpoints.down("sm")]: {
        margin: "1rem 0 0.4rem 0",
      },
    },
  })
);

type SeriesComponentProps = {
  quantity?: Quantity;
  index?: number;
  newSeries: boolean;
  variant?: VariantType;
  singleSetID?: number;
};
const SeriesComponent = ({
  quantity,
  index,
  newSeries,
  variant,
  singleSetID,
}: SeriesComponentProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (quantity) {
      const kg = `${quantity.kg > 0 ? ` x ${quantity.kg}kg` : ""}`;

      if (quantity.variant === VariantType.rep) {
        setMessage(quantity.quantity + kg);
      } else if (quantity.variant === VariantType.seconds) {
        setMessage(quantity.quantity + "s " + kg);
      } else if (quantity.variant === VariantType.minutes) {
        setMessage(quantity.quantity + "m " + kg);
      } else if (quantity.variant === VariantType.minSec) {
        const minutes = Math.floor(quantity.quantity / 60);
        const seconds = quantity.quantity - minutes * 60;
        const convertedSeconds = seconds > 10 ? seconds : "0" + seconds;
        setMessage(minutes + "m :" + convertedSeconds + "s" + kg);
      }
    }
  }, []);

  return (
    <Box className={classes.series}>
      {newSeries ? (
        <>
          <Box component="span" className={classes.span}>
            new series{" "}
          </Box>
          <Box
            component="button"
            className={classes.button}
            onClick={() =>
              dispatch(
                openDialog({
                  type: DialogType.add_serie,
                  variant,
                  activeSingleSet: singleSetID,
                })
              )
            }
          >
            +
          </Box>
        </>
      ) : (
        <>
          <Box component="span" className={classes.span}>
            series {(index as number) + 1}
          </Box>
          <Box>{message}</Box>
        </>
      )}
    </Box>
  );
};

export default SeriesComponent;
