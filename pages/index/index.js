import { Component } from 'react';
import { connect } from 'react-redux';

import { GradientLayout } from 'layouts';
import { Button } from 'components';
import Gov from './gov';
import Residency from './residency';

const sections = [
  {
    content: ({ nextSection }) => (
      <div className="ta-c">
        <h1>The future of digital identity</h1>
        <p>
          Have you ever thought about how digital citizenship could look like?
        </p>
        <p>
          What will change for individuals and organisations if a country decides to make a leap
          from countless user accounts to self-sovereign identity technology?
        </p>
        <br />
        <Button onClick={nextSection}>Start experience</Button>
      </div>
    ),
    className: 'margin-center',
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
      </>
    ),
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
        <img
          className="translate-center"
          src="/static/images/qr-google-play.svg"
          alt="QR code to the google play"
        />
      </>
    ),
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
      </>
    ),
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
];

class Home extends Component {
  render() {
    const { userData } = this.props;

    return (
      <GradientLayout
        items={sections}
        scrollValidations={{
          4: !!userData.did,
        }}
      />
    );
  }
}

export default connect(state => state)(Home);
