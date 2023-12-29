import { Provider } from "react-redux";
import Layout from "../src/layout/Layout";
import { store } from "../src/store/reducer";
import "../styles/globals.css";
import CastProvider from 'react-chromecast';

function MyApp({ Component, pageProps }) {
  return (
    <CastProvider>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </CastProvider>
  );
}

export default MyApp;
