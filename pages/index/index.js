import { Component } from 'react';
import { connect } from 'react-redux';

import { GradientLayout } from 'layouts';
import { Button, Footer, About } from 'components';
import Gov from './gov';
import Residency from './residency';
import DrivingLicence from './drivingLicence';

import { setAboutOverlayState } from 'actions/ui';

const sections = [
  {
    content: ({ nextSection }) => (
      <div className="ta-c">
        <h1>The future of digital identity</h1>
        <div className="margin-center" style={{ width: 560, maxWidth: '100%' }}>
          <p>
            Have you ever thought about how digital citizenship could look like?
          </p>
          <p>
            What will change for individuals and organisations if a country decides to make a leap
            from countless user accounts to self-sovereign identity technology?
          </p>
        </div>
        <br />
        <Button className="mt" onClick={nextSection}>Start experience</Button>
      </div>
    ),
    className: 'center',
  },
  {
    bgImage: '/static/images/OSiP_01.jpg',
    content: (
      <>
        <h1>Discover Avalon</h1>
        <p>
          Avalon is a smal sovereign country situated on the North Sea coast known for having the
          most urban infrastructure.
        </p>
        <p>
          Avalon had it's dark days - as every country. Two years ago, when society reached its
          limits of disengagement, its government decided to run a few experiments to improve
          people's lives.
        </p>
        <p>
          After several attempts, two implementations reached the level of mass adoption.
          One of them is a new approach to identity management.
        </p>

        <Footer />
      </>
    ),
    className: 'left',
  },
  {
    bgImage: '/static/images/OSiP_02.jpg',
    content: (
      <>
        <h1>Prepare for arrival</h1>
        <p>
          In Avalon, this new identity system lets everyone access services of urban infrastructure.
          Wether you are visiting or relocating for good - a digital identity is the key to this
          country.
        </p>
        <p>
          To install the <u>SmartWallet</u>, please scan the QR code:
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
    className: 'left',
  },
  {
    bgImage: '/static/images/OSiP_03.jpg',
    content: (
      <>
        <h1>Set up your identity</h1>
        <p>
          Now it's time to create your own identity.
        </p>
        <p>
          1. Open the SmartWallet. <br />
          2. Follow the instalation guide. <br />
          3. Finally, add your <u>full name</u>.
        </p>
        <br /><br />
        <p>Ready? Scroll down to enter the country.</p>

        <Footer />
      </>
    ),
    className: 'left',
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
  {
    bgImage: '/static/images/recidency_bg.jpg',
    content: Residency,
    style: {
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  {
    bgImage: '/static/images/driver_licence_bg.jpg',
    content: DrivingLicence,
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
    const { userData, ui } = this.props;

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
          noGradient={[4]}
        />

        {ui.showAboutOverlay && (
          <About onClose={() => this.props.setAboutOverlayState(false)} />
        )}
      </>
    );
  }
}

export default connect(state => state, {
  setAboutOverlayState,
})(Home);
