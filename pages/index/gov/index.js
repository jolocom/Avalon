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
          <h1>Welcome to Avalon!</h1>
          <p>
            Please, register your arrival
          </p>
          <br />
          <Button onClick={() => this.handleInitiateLogin()}>
            <img
              src="/static/images/jolocom-icon-transparent.svg"
              alt="Jolocom logo"
              height={20}
            />
            <span>
              Continue with Jolocom
            </span>
          </Button>
        </div>
      ),
      (
        <div className="half-width margin-center ta-c">
          <h2>Scan the QR-code with your SmartWallet:</h2>
          <img src={this.props.qrCode} width={300} />
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
