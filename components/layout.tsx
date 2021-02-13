import Navigation from "components/navigation";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const Router = useRouter();

  const useStyles = makeStyles((theme) => ({
    root: {
      background: theme.palette.background.default,
      minHeight: `${
        Router.pathname !== "/login" ? "calc(100vh - 64px)" : "100vh"
      }`,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Navigation />

      <Paper elevation={0} square className={classes.root} component="main">
        <Container fixed component="section">
          <>{children}</>
        </Container>
      </Paper>
    </>
  );
};

export default Layout;
