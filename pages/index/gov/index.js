import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';
import Authorized from './Authorized';

import { initiateLogin } from 'actions/auth';

class GovSpace extends Component {
  state = {
    sectionIndex: 0,
  }

  setSection = idx => this.setState({ sectionIndex: idx })

  handleInitiateLogin = () => {
    this.props.initiateLogin(() => this.setSection(1))
      .then(() => this.setSection(2));
  }

  render() {
    const sections = [
      (
        <div
          className="half-width margin-center ta-c"
        >
          <img
            src="/static/images/Avalon_logo.svg"
            alt="imaginary city or country logo"
            className="AvalonLogo"
          />
          <h1>Welcome to Avalon!</h1>
          <p>
            Please, register your arrival
          </p>
          <br />
          <Button onClick={this.handleInitiateLogin}>
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
        <div
          className="half-width margin-center ta-c"
        >
          <img
            src="/static/images/Avalon_logo.svg"
            alt="imaginary city or country logo"
            className="AvalonLogo"
          />
          <h4>Scan the QR-code with your SmartWallet:</h4>
          <img src={this.props.qrCode} width={300} />
          <h5
            data-tooltip="Make sure that you have added your full name to the SmartWallet"
          >
            Doesn't work?
          </h5>
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
            color: rgba(5,5,13,0.80);
          }

          .GovSpace > :global(div:first-child) {
            background-color: #fff;
          }

          .GovSpace :global(.half-width) {
            width: 56.67rem;
            min-width: 300px;
            padding: 3.75rem 5.42rem 2.25rem;
            margin-top: 13.08rem;
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
