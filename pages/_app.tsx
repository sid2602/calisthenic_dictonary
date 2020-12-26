import type { AppProps } from "next/app";
import { GlobalStyle } from "components/styles";
import Navigation from "components/navigation/navigation";
import ThemeProvider from "components/theme";
import Layout from "components/layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider darkTheme={true}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
