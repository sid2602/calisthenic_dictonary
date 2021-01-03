import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { Formik } from "formik";
import React from "react";
import { handleClick } from "data/snackbarSlice";
import { SnackbarType } from "data/snackbarSlice";
import LoginSchema from "schemas/loginSchema";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "services/auth";
// import { onSubmitLogin } from "services/auth";
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
    facebookBtn: {
      background: "#4e71ba",
      "&:hover": {
        background: "#3b5998",
      },
    },
    googlekBtn: {
      color: "gray",
      background: "#f4f4f4",
      "&:hover": {
        background: "#cdcdcd",
      },
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
  const router = useRouter();

  const urlFacebook = process.env.API_URL + "connect/facebook";
  const urlGoogle = process.env.API_URL + "connect/google";

  const onButtonClickError = (
    errorsEmail: string | undefined,
    errorsPassword: string | undefined,
    values: {
      password: string;
      email: string;
    }
  ) => {
    if (errorsEmail || errorsPassword) {
      dispatch(
        handleClick({
          type: SnackbarType.error,
          message: `${errorsEmail !== undefined ? errorsEmail : ""}  ${
            errorsPassword !== undefined ? errorsPassword : ""
          }`,
        })
      );
    } else if (
      errorsPassword === undefined &&
      errorsEmail === undefined &&
      values.email.length === 0 &&
      values.password.length === 0
    ) {
      dispatch(
        handleClick({
          type: SnackbarType.error,
          message: `Email and passord are required`,
        })
      );
    }
  };

  return (
    <>
      <Box component="section">
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" className={classes.heading}>
            Login
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              const loginSrc = `${process.env.API_URL}auth/local`;

              try {
                const { data } = await axios.post(loginSrc, {
                  identifier: values.email,
                  password: values.password,
                });

                setUser(data.jwt);

                router.push("/");

                dispatch(
                  handleClick({
                    type: SnackbarType.success,
                    message: "Success log in",
                  })
                );
              } catch {
                dispatch(
                  handleClick({
                    type: SnackbarType.error,
                    message: "Wrong Email or Password",
                  })
                );
              }
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form
                noValidate
                autoComplete="off"
                className={classes.form}
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />

                <Button
                  className={classes.firstButton}
                  type="submit"
                  onClick={() =>
                    onButtonClickError(errors.email, errors.password, values)
                  }
                >
                  Log in
                </Button>
                <a href={urlFacebook}>
                  <Button
                    className={`${classes.button} ${classes.facebookBtn}`}
                  >
                    <Icon src="img/fb.png" alt="fb" />
                    Log in with Facebook
                  </Button>
                </a>
                <a href={urlGoogle}>
                  <Button className={`${classes.button} ${classes.googlekBtn}`}>
                    <Icon src="img/google.png" alt="google" />
                    Log in with Google
                  </Button>
                </a>
              </form>
            )}
          </Formik>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
