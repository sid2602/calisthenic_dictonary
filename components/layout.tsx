import Navigation from "components/navigation";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    height: `calc(100vh - 64px)`,
  },
}));

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Navigation />
      <Box component="main">
        <Paper elevation={0} square className={classes.root}>
          <Container fixed>
            <>{children}</>
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default Layout;
