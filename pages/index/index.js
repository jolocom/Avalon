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
            How will decentralised technologies emerging today change the world of tomorrow?
            What will citizenship, access, and freedom of movement look like when
            people and organisations own and control the data that defines them?
            <br /> <br />
            This web experience is a demo of the future of self-owned digital identity.
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
          Recognised around the globe for its state-of-the-art urban infrastructure,
          Avalon is a hypermodern, technologically advanced nation from some not-so-distant future.
          <br /> <br />
          Like every country, Avalon also had its dark days: just two years ago, public
          trust in basic civic institutions had reached record lows. In a collaborative
          effort to restore trust in the system, state officials & private citizens
          came together to address the country’s infrastructural
          challenges and inefficiencies. Among those initiatives was the introduction
          of a decentralised digital identity and access rights management system.
          <br /> <br />
          Experience what possibilities the future of digital identity has in store.
          It’s time to discover Avalon.
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
          Both visitors and residents use the SmartWallet to interact with the
          urban environment in Avalon & access local public services.
          The SmartWallet holds your digital identity and documents.
          <br />
          <br />
          You can get your own copy of the SmartWallet free of charge <br/>— just scan this QR code:
        </p>
        <div>
          <img
            src="/static/images/qr-google-play.svg"
            alt="QR code to the google play"
            style={{ marginLeft: 130 }}
          />
        </div>
        <p>
          Learn more about the Jolocom SmartWallet <u>here</u>.
        </p>
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
          Now it's time to create a decentralised identity for yourself.
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
