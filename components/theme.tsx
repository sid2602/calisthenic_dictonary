import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  darkTheme: boolean;
};

const ThemeP = ({ children, darkTheme }: Props) => {
  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: "#ff8906",
        contrastText: "white",
      },
      secondary: {
        main: "#2cb67d",
        contrastText: "white",
      },
    },
    typography: {
      fontFamily: "Comic Sans MS",
    },

    overrides: {
      MuiButton: {
        root: {
          textTransform: "none",
        },
      },
    },
    props: {
      MuiButton: {
        variant: "contained",
        color: "primary",
      },
      MuiCard: {
        elevation: 12,
      },
      MuiPaper: {
        elevation: 12,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeP;
