import React from "react";
import type { AppProps } from "next/app";
import { GlobalStyle } from "components/styles";
import ThemeProvider from "components/theme";
import Layout from "components/layout";
import { Provider } from "react-redux";
import store from "data/store";
import SnackBar from "components/snackBar/snackbar";
import Modal from "components/modal/modal";
import Dialog from "components/dialog/dialog";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider darkTheme={true}>
        <GlobalStyle />
        <Layout>
          <SnackBar />
          <Dialog />
          <Modal />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
