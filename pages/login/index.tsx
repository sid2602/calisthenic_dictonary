import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { openSnackbar } from "data/snackbarSlice";
import { SnackbarType } from "data/snackbarSlice";
import LoginSchema from "schemas/loginSchema";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "services/auth";
import useSnackbar from "helpers/snackbarHooks/useSnackbar";
import { destroyCookie } from "nookies";
import { handleFetchLoadingChange } from "data/loaderSlice";

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
      [theme.breakpoints.down("xs")]: {
        width: "300px",
        height: "430px",
      },
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
      [theme.breakpoints.down("xs")]: {
        width: "95%",
      },
    },

    button: {
      width: "100%",
      margin: "0.6rem auto",
      [theme.breakpoints.down("xs")]: {
        fontSize: 15,
      },
    },
    firstButton: {
      margin: "2rem auto 0.6rem auto",
      [theme.breakpoints.down("xs")]: {
        margin: "1.5rem auto 0.6rem auto",
      },
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
  const { showSnackbar } = useSnackbar();
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
        openSnackbar({
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
        openSnackbar({
          type: SnackbarType.error,
          message: `Email and passord are required`,
        })
      );
    }
  };
  useEffect(() => {
    destroyCookie(null, "jwt");
  }, []);

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
                dispatch(handleFetchLoadingChange({ loading: true }));
                const { data } = await axios.post(loginSrc, {
                  identifier: values.email,
                  password: values.password,
                });

                setUser(data.jwt);
                dispatch(handleFetchLoadingChange({ loading: false }));
                router.push("/");
                showSnackbar(SnackbarType.success, "Success log in");
              } catch {
                showSnackbar(SnackbarType.error, "Wrong Email or Password");
                dispatch(handleFetchLoadingChange({ loading: false }));
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
                  className={` ${classes.button} ${classes.firstButton}`}
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
