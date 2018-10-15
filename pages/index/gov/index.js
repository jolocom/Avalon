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
        <div className="half-width margin-center ta-c">
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
        </div>
      ),
      (
        <div className="half-width margin-center ta-c">
          <h4>Please, scan the QR-code with your SmartWallet:</h4>
          <img src={this.props.qrCode} width={400} />
          <p className="small pink">
            Before scanning, please mase sure that you have added your full name to SmartWallet.
          </p>
        </div>
      ),
      Authorized,
    ];

    const currentSection = sections[this.state.sectionIndex];
    return (
      <div className="GovSpace">
        {typeof currentSection === 'function'
          ? React.createElement(currentSection, this.props)
          : currentSection}
        <style jsx>{`
          div,
          div :global(p) {
            color: #000;
          }

          .GovSpace > :global(div:first-child) {
            background-color: #fff;
            padding: 70px 80px;
          }
          .GovSpace :global(.half-width) {
            width: 50%;
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
