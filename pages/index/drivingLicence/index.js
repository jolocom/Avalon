import { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { Button, Input } from 'components';
import { getDrivingLicence } from 'actions/user';
import ClipLoader from 'react-spinners/ClipLoader';

class Residency extends Component {
  state = {
    sectionIndex: 0,
    residence: '',
    postalCode: '',
  };

  nextSection = cb => this.setState({ sectionIndex: this.state.sectionIndex + 1 }, cb);
  nextLoading = cb => {
    this.nextSection(() => {
      setTimeout(() => {
        this.nextSection(() => {
          setTimeout(() => {
            cb();
          }, 1000);
        });
      }, 3000);
    });
  };

  handleChangeInput = (key, value) => this.setState({ [key]: value });
  handleGetDrivingLicence = evt => {
    evt.preventDefault();
    const { residence, postalCode } = this.state;
    this.nextLoading(() => {
      this.props
        .getDrivingLicence(
          {
            residence,
            postalCode,
          },
          this.nextSection
        ).then(this.nextSection);
    });
  };
  render() {
    const { residence, postalCode } = this.state;
    const sections = [
      <>
        <h2>Get an Avalon driving permit</h2>
        <h5>STEP 1</h5>
        <p>Before the local municipal authority can issue you an Avalon driving permit,
        you must provide the information requested below.</p>
        <br />
        <form onSubmit={this.handleGetDrivingLicence}>
          <Input
            placeholder="permanent residence"
            onChange={evt =>
              this.handleChangeInput('residence', evt.target.rawValue)
            }
            value={residence}
            labelText="residence"
          />
          <Input
            placeholder="postal code"
            onChange={evt =>
              this.handleChangeInput('postalCode', evt.target.rawValue)
            }
            value={postalCode}
            labelText="postal code"
          />
          <Button className="mt-5" disabled={!residence || !postalCode}>
            Next
          </Button>
          <style jsx>{`
            form {
              display: flex;
              flex-direction: column;
              width: 50%;
              margin: auto;
            }
          `}</style>
        </form>
      </>,
      <>
        <div className="loading">
          <ClipLoader
            sizeUnit={'px'}
            size={40}
            color={'#000000'}
            loading={true}
          />
        </div>
        <br />
        <p>
          Your request is now being processed.
        </p>
        <style jsx>{`
          .loading {
            height: 50px;
            margin-top: 100px;
          }
          p {
            margin-bottom: 100px;
          }
        `}</style>
      </>,
      <>
        <div className="done-icon">
          <img
            src="/static/images/verified_green.svg"
            style={{ width: 50, height: 50 }}
          />
        </div>
        <p>
          Your request was approved.
        </p>
        <br />
        <style jsx>{`
          .done-icon {
            height: 50px;
            margin-top: 100px;
          }
          p {
            margin-bottom: 100px;
          }
        `}</style>
      </>,
      <>
        <h2>Get an Avalon driving permit</h2>
        <h5>STEP 2</h5>
        <p>
          Scan the QR code with your SmartWallet to save your driving permit onto your device:
        </p>
        <br />
        <img src={this.props.qrCode} width={300} alt="qr code" />
      </>,
      <>
        <h1>Success</h1>
        <p>
          You have been issued a driving permit for Avalon.
          <br /><br />
          You can view your new digital driving permit in your SmartWallet (under the <i>Documents</i> tab).
        </p>
        <br />
        <Link href="/index/gov/authorized">
          <Button
            flat
            pink
            className="mt-5"
          >
            Return to home page
          </Button>
        </Link>
      </>,
    ];
    const currentSection = sections[this.state.sectionIndex];

    return (
      <div className="wrapper">
        <div className="ta-c margin-center">
          <img
            src="/static/images/Avalon_logo.svg"
            alt="imaginary city or country logo"
            className="AvalonLogo"
          />
          {typeof currentSection === 'function'
            ? React.createElement(currentSection)
            : currentSection}
        </div>
        <style jsx>{`
          .wrapper {
            background: url(/static/images/GOV_01.jpg) right top / cover
              no-repeat #000;
            overflow: hidden;
            width: 100%;
            min-height: 100%;
            height: 100vh;
          }
          div {
            background-color: #fff;
            width: 50%;
            padding: 70px 65px;
          }
          div,
          div :global(p) {
            color: #000;
          }
          div :global(h5) {
            text-decoration: none;
            letter-spacing: 2.58px;
          }
        `}</style>
      </div>
    );
  }
}

Residency = connect(
  state => ({
    qrCode: state.qrCode,
  }),
  {
    getDrivingLicence,
  }
)(Residency);

export default Residency;
