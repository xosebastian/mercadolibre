import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/core/theme';

Router.events.on('routeChangeComplete', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});


export default function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, []);


  return (
    <React.Fragment>
      <Head>
        <title>Mercado Libre</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="language" content="es-ar" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

App.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
};