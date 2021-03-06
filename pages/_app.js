import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import throttle from 'lodash.throttle';

import { SmallScreenMsg } from 'components';

import initStore from '../utils/store';
import React from 'react';
import About from '../components/About';
import { setAboutOverlayState } from '../actions/ui';

const MOBILE_BREAKPOINT = 1024;
const getWidth = () =>
  window.innerWidth > 0 ? window.innerWidth : screen.width;
const isMobile = () => getWidth() < MOBILE_BREAKPOINT;

class MyApp extends App {
  state = {
    isMobile: false,
    isAbout: false,
  };
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  componentDidMount() {
    let store;
    this.props.store.subscribe(() => {
      store = this.props.store.getState();
      this.setState({ isAbout: store.ui.showAboutOverlay });
    });
    this.handleExternalRoutes();
    this.setIsMobile();
    window.addEventListener('resize', this._setIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setIsMobile);
  }

  setIsMobile = () => {
    this.setState({ isMobile: isMobile() });
  };
  _setIsMobile = throttle(this.setIsMobile, 1500);

  handleExternalRoutes = () => {
    if(Router.route !== '/') {
      Router.replace('/');
    }
  };

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          {this.state.isMobile ? (
            <SmallScreenMsg />
          ) : (
            this.state.isAbout
              ? <About onClose={() => store.dispatch(setAboutOverlayState(false))} />
              : <Component {...pageProps} />
          )}
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
