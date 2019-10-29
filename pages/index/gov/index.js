import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';
import ClipLoader from 'react-spinners/ClipLoader';
import Router from 'next/router';

import { initiateLogin } from 'actions/auth';

class GovSpace extends Component {
  state = {
    sectionIndex: 0,
  };

  setSection = (idx, cb) => this.setState({ sectionIndex: idx }, cb);

  handleInitiateLogin = () => {
    this.setSection(1, () => {
      setTimeout(() => {
        this.props
          .initiateLogin(() => this.setSection(2))
          .then(() => Router.push('/index/gov/authorized'));
      }, 500);
    });
  };

  render() {
    const sections = [
      <div className="half-width margin-center ta-c">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        <h1>Welcome to Avalon!</h1>
        <p>Please, register your arrival</p>
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
      <div className="half-width margin-center ta-c">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        <div className="loading">
          <ClipLoader
            sizeUnit={'px'}
            size={40}
            color={'#000000'}
            loading={true}
          />
        </div>
        <h4>Preparing QR Code</h4>
        <style jsx>{`
          .loading {
            margin-top: 100px;
            height: 50px;
          }
        `}</style>
      </div>,
      <div className="half-width margin-center ta-c">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        <h4>Scan the QR-code with your SmartWallet:</h4>
        <img src={this.props.qrCode} className="qrCode" />
        <h5 data-tooltip="Make sure that you have added your full name to the SmartWallet">
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
            height: 35.83rem;
            min-width: 300px;
            padding: 3.75rem 5.42rem 2.25rem;
            margin-top: 13.08rem;
            border-radius: 2px;
          }

          @media only screen and (min-width: 1440px) {
            .GovSpace :global(.half-width) {
              margin-top: 15rem;
            }
          }
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
