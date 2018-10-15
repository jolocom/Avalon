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
        <h1>Self-sovereign identity future</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eum culpa corporis
          rem nisi minima, sit aut! Aperiam, fugiat sapiente eos incidunt cumque ratione enim
          maxime, quisquam dolores tempore asperiores.{' '}
          <a
            href="https://jolocom.io/"
            data-tooltip="very brief explanation to some links goes as hover - just in order to not overload page"
          >
            Link with hover
          </a>
        </p>
        <br />
        <Button onClick={nextSection}>Start SSI experience</Button>
      </div>
    ),
    className: 'margin-center',
  },
  {
    bgImage: '/static/images/OSiP_01.jpg',
    content: (
      <>
        <h1>Lindberg, nowadays</h1>
        <p>
          Situated on the border between Germany and France, hover link is well known for having
          the highest level of urban infrustructure.
        </p>
        <p>
          Government of Lindberg recently adopted a decentralized identity system in a push to
          improve privacy for its citizens.
        </p>
      </>
    ),
  },
  {
    bgImage: '/static/images/OSiP_02.jpg',
    content: (
      <>
        <h1>Before you arrive</h1>
        <p>
          In Lindberg, all people - residents and visitors - use the SmartWallet to access urban
          infrustructure and services.
        </p>
        <p>
          As a visitor and potential temporary resident you also will need it. To download
          the <u>SmartWallet</u>, scan the QR code:
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
        <h1>Setup your identity</h1>
        <p>
          Some text, when you have your full name added to Wallet, please scroll.
        </p>
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
        // scrollValidations={{
        //   4: !!userData.did,
        // }}
      />
    );
  }
}

export default connect(state => state)(Home);
