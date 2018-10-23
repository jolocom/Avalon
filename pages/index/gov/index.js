import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';
import Authorized from './Authorized';

import { initiateLogin } from 'actions/auth';

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
          <img
            src="/static/images/Avalon_logo.png"
            alt="imaginary city or country logo"
          />
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
          <img
            src="/static/images/Avalon_logo.png"
            alt="imaginary city or country logo"
          />
          <h3>Scan the QR-code with your SmartWallet:</h3>
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
            padding: 40px 100px;
          }
          .GovSpace :global(.half-width) {
            width: 50%;
            min-width: 300px;
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
