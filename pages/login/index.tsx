import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { handleClick, handleClose } from "data/snackbarSlice";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import React from "react";
import { SnackbarType } from "data/snackbarSlice";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",

      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      display: "flex",
      flexDirection: "column",
      width: "400px",
      height: "450px",
      padding: theme.spacing(4),
    },
    heading: {
      width: "100%",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      margin: "0 auto ",
      "& >div": {
        margin: " 0.6rem 0 ",
      },
    },
    firstButton: {
      width: "100%",
      margin: "2rem auto 0.6rem auto",
    },
    button: {
      width: "100%",
      margin: "0.6rem auto",
    },
  })
);

const Icon = styled.img`
  width: 30px;
  margin-right: 1rem;
`;

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <Box component="section">
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" className={classes.heading}>
            Login
          </Typography>

          <form noValidate autoComplete="off" className={classes.form}>
            <TextField id="standard-basic" label="Username" />
            <TextField id="standard-basic" label="Password" type="password" />
            <Button
              className={classes.firstButton}
              onClick={() => dispatch(handleClick(SnackbarType.success))}
            >
              Log in
            </Button>
            <Button
              className={classes.button}
              style={{ background: "#4e71ba" }}
            >
              <Icon src="img/fb.png" alt="fb" />
              Log in with Facebook
            </Button>
            <Button
              className={classes.button}
              style={{ color: "gray", background: "#f4f4f4" }}
            >
              <Icon src="img/google.png" alt="google" />
              Log in with Google
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
