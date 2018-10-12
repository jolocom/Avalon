import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';
import Authorized from './Authorized';

import { initiateLogin } from '../../../actions/auth';

class GovSpace extends Component {
  state = {
    sectionIndex: 0,
  }

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })

  handleInitiateLogin = () => {
    this.props.initiateLogin(this.nextSection)
      .then(this.nextSection);
  }

  render() {
    const sections = [
      (
        <>
          <h1>Welcome to Lingberg!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eum culpa corporis
            rem nisi minima, sit aut! Aperiam, fugiat sapiente eos incidunt cumque ratione enim
            maxime, quisquam dolores tempore asperiores.
          </p>
          <br />
          <Button onClick={() => this.handleInitiateLogin()}>
            Register my arrival
          </Button>
        </>
      ),
      (
        <>
          <h4>Please, scan the QR-code with your SmartWallet:</h4>
          <img src={this.props.qrCode} width={400} />
          <p className="small pink">
            Before scanning, please mase sure that you have added your full name to SmartWallet.
          </p>
        </>
      ),
      Authorized,
    ];

    const currentSection = sections[this.state.sectionIndex];
    return (
      <div className="ta-c margin-center">
        {typeof currentSection === 'function'
          ? React.createElement(currentSection)
          : currentSection}
        <style jsx>{`
          div {
            background-color: #fff;
            width: 50%;
            padding: 70px 65px;
          }
          div,
          div :global(p) {
            color: #000;
          }
        `}</style>
      </div>
    );
  }
}

GovSpace = connect(state => ({
  qrCode: state.qrCode,
}), {
  initiateLogin,
})(GovSpace);

export default GovSpace;
