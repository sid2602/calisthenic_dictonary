import type { AppProps } from "next/app";
import { GlobalStyle } from "components/styles";
import Navigation from "components/navigation/navigation";
import ThemeProvider from "components/theme";
import Layout from "components/layout";
import { Provider } from "react-redux";
import store from "data/store";
import SnackBar from "components/snackBar/snackbar";
import { AuthProvider } from "components/AuthProvider/authProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider darkTheme={true}>
          <GlobalStyle />
          <Layout>
            <SnackBar />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
