import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import SplashScreen from "../components/SplashScreen";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SplashScreen />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default App;
