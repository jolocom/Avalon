import { Component } from 'react';
import { connect } from 'react-redux';

import { FullBackgroundLayout } from 'layouts';
import { Button } from 'components';
import Authorized from './Authorized';

import { initiateLogin } from '../../actions/auth';

class Home extends Component {
  sections = [
    {
      bgImage: '/static/images/GOV_01.jpg',
      content: ({ nextSection }) => (
        <div className="ta-c">
          <h1>Welcome to Lingberg!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eum culpa corporis
            rem nisi minima, sit aut! Aperiam, fugiat sapiente eos incidunt cumque ratione enim
            maxime, quisquam dolores tempore asperiores.
          </p>
          <br />
          <Button onClick={() => this.handleInitiateLogin({ nextSection })}>
            Register my arrival
          </Button>

          <style jsx>{`
          div {
            background-color: #fff;
            width: 50%;
            padding: 70px 65px;
          }
          div, p {
            color: #000;
          }
        `}</style>
        </div>
      ),
    },
    {
      bgImage: '/static/images/GOV_01.jpg',
      content: () => (
        <div className="ta-c margin-center">
          <h4>Please, scan the QR-code with your SmartWallet:</h4>
          <img src={this.props.qrCode} width={400} />
          <p className="small pink">
            Before scanning, please mase sure that you have added your full name to SmartWallet.
          </p>
          <br />

          <style jsx>{`
          div {
            background-color: #fff;
            width: 50%;
            padding: 70px 65px;
          }
          div {
            color: #000;
          }
        `}</style>
        </div>
      ),
    },
    {
      content: Authorized,
      style: {
        backgroundSize: '100%',
      },
    },
  ];

  handleInitiateLogin = ({ nextSection }) => {
    this.props.initiateLogin(nextSection)
      .then(nextSection);
  }

  render() {
    return (
      <FullBackgroundLayout
        items={this.sections}
      />
    );
  }
}

Home = connect(state => ({
  qrCode: state.qrCode,
}), {
  initiateLogin,
})(Home);

export default Home;
