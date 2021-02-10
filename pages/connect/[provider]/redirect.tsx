import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setUser } from "services/auth";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      fontSize: "1.5rem",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
    },
    p: {
      margin: 0,
      padding: 0,
    },
  })
);

const LoginRedirect = (props: object) => {
  const classes = useStyles();
  const [text, setText] = useState(<CircularProgress size={50} />);

  const router = useRouter();
  const { access_token, provider } = router.query;
  const url = `${process.env.API_URL}auth/${provider}/callback?access_token=${access_token}`;
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(url);
        setUser(data.jwt);
        setText(
          <p>
            "You have been successfully logged in. You will be redirected in a
            few seconds..."
          </p>
        );
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        setText(
          <p>
            "An error occurred.Please login again or use another login option.
            You will be redirected in a few seconds to login page... "
          </p>
        );

        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    };

    provider !== undefined && access_token !== undefined && getUser();
  }, [router.query]);

  return <Box className={classes.root}>{text}</Box>;
};

export default LoginRedirect;
