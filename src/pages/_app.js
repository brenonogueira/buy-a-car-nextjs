import { useState } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { useStore } from "../store";

// import Dashboard from "../dashboard";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            theme="colored"
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
