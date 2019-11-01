import { Component } from 'react';
import { connect } from 'react-redux';

import { GradientLayout } from 'layouts';
import { Button, Footer } from 'components';
import Gov from './gov';

import { setAboutOverlayState } from 'actions/ui';
const pinkGradient =
  'radial-gradient(circle at top left, rgba(148, 47, 81, 0.5), rgba(6,6,16,0) 45%)';
const sections = [
  {
    content: ({ nextSection }) => (
      <div className="ta-c">
        <h1>The future of digital identity</h1>
        <div className="margin-center" style={{ width: 560, maxWidth: '100%' }}>
          <p>
            Today's next-generation technologies will change how we interact in the world of tomorrow.
            <br /> <br />
            What will citizenship, access, and freedom of movement look like when people & end-users control their own data?
          </p>
        </div>
        <br />
        <Button className="mt-2" onClick={nextSection}>
          Start experience
        </Button>
      </div>
    ),
    className: 'center special-space-top',
    containerGradient: pinkGradient,
  },
  {
    bgImage: '/static/images/OSiP_01.jpg',
    content: (
      <>
        <h1>Discover Avalon</h1>
        <p>
          A next-generation metropolis. Intelligent urban environments. Interactive. Responsive. Decentralized.
          <br /> <br />
          Avalon is the technologically-advanced model of society for communities around the globe from some not-so-distant future.
          <br /> <br />
          Experience the forefront of digital identity. It’s time to discover Avalon.
        </p>

        <Footer />
      </>
    ),
    className: 'left special-space-top',
    containerGradient: pinkGradient,
  },
  {
    bgImage: '/static/images/OSiP_02.jpg',
    content: (
      <>
        <h1>Prepare for arrival</h1>
        <p>
          Anyone can interact with the local urban environment in Avalon simply by using a mobile app.
          The SmartWallet allows you to keep digital IDs & identification documents on a smartphone,
          allowing instant access to a range of public services.
          <br />
          <br />
          The best part? It's absolutely free of charge and easy to install! Just scan this QR code:
        </p>
        <div>
          <img
            src="/static/images/qr-google-play.svg"
            alt="QR code to the google play"
            style={{ marginLeft: 130 }}
          />
        </div>
        <Footer />
      </>
    ),
    className: 'left special-space-top',
    containerGradient: pinkGradient,
  },
  {
    bgImage: '/static/images/OSiP_03.jpg',
    content: (
      <>
        <h1>Set up your identity</h1>
        <p>
          Now it's time to create a public digital identity for yourself.
          <br />
          <br />
          1. Open the SmartWallet. <br />
          2. Follow the in-app instructions <br />
          3. Add your full name.
          <br />
          <br />
          Easy right? Scroll down to register your arrival.
        </p>

        <Footer />
      </>
    ),
    className: 'left special-space-top',
    containerGradient: pinkGradient,
  },
  {
    bgImage: '/static/images/GOV_01.jpg',
    content: Gov,
    style: {
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
];

class Home extends Component {
  render() {
    const { userData } = this.props;

    return (
      <>
        <GradientLayout
          items={sections}
          scrollValidations={{
            0: {
              forward: false,
            },
            4: {
              forward: !!userData.did,
            },
          }}
          noGradient={[4, 5, 6]}
        />
      </>
    );
  }
}

export default connect(
  state => state,
  {
    setAboutOverlayState,
  }
)(Home);
