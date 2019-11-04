import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';
import Router from 'next/router';

import { initiateLogin } from 'actions/auth';

class GovSpace extends Component {
  state = {
    sectionIndex: 0,
  };

  setSection = idx => this.setState({ sectionIndex: idx });

  handleInitiateLogin = () => {
    this.props
      .initiateLogin(() => this.setSection(1))
      .then(() => Router.push('/index/gov/authorized'));
  };

  render() {
    const sections = [
      <div className="half-width ta-c">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        <h1>Welcome to Avalon!</h1>
        <p>Please click the continue button to register your arrival.</p>
        <Button withLogo onClick={this.handleInitiateLogin}>
          Continue with Jolocom
        </Button>

        <style jsx>{`
          h1 {
            margin-top: 2.92rem;
          }
          p {
            margin-top: 2.5rem !important;
            margin-bottom: 3.67rem;
          }
        `}</style>
      </div>,
      <div className="half-width ta-c">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        <h4>Scan the QR-code with your SmartWallet:</h4>
        <img width={300} src={this.props.qrCode} />
        <h5 data-tooltip="Make sure that you have added your full name to your SmartWallet">
          Doesn't work?
        </h5>
      </div>,
    ];

    const currentSection = sections[this.state.sectionIndex];
    return (
      <div className="GovSpace">
        {typeof currentSection === 'function'
          ? React.createElement(currentSection, this.props)
          : currentSection}
        <style jsx>{`
          .GovSpace {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .GovSpace,
          .GovSpace :global(p) {
            color: rgba(5, 5, 13, 0.8);
          }
          .GovSpace > :global(div:first-child) {
            background-color: #fff;
          }
          .GovSpace :global(.half-width) {
            width: 56.67rem;
            min-width: 300px;
            padding: 70px 65px;
            border-radius: 2px;
        `}</style>
      </div>
    );
  }
}

GovSpace = connect(
  state => ({
    qrCode: state.qrCode,
  }),
  {
    initiateLogin,
  }
)(GovSpace);

export default GovSpace;
