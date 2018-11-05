
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import throttle from 'lodash.throttle';

import { SmallScreenMsg } from 'components';

import initStore from '../utils/store';

const MOBILE_BREAKPINT = 1200;
const isMobile = () => window.innerWidth < MOBILE_BREAKPINT;

class MyApp extends App {
  state = {
    isMobile: false,
  }
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };
  }

  componentDidMount() {
    this.setIsMobile();
    window.addEventListener('resize', this._setIsMobile);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._setIsMobile);
  }

  setIsMobile = () => {
    this.setState({ isMobile: isMobile() });
  }
  _setIsMobile = throttle(
    this.setIsMobile,
    1500
  )

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          {this.state.isMobile ? (
            <SmallScreenMsg />
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);

