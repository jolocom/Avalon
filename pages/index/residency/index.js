import { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { Button, Input } from 'components';
import { setResidency } from 'actions/user';
import { formatDateString } from '../../../utils/date_format';
import ClipLoader from 'react-spinners/ClipLoader';

class Residency extends Component {
  state = {
    sectionIndex: 0,
    birthDate: '',
    birthPlace: '',
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

  handleSetResidency = evt => {
    evt.preventDefault();
    const { birthPlace } = this.state;
    let { birthDate } = this.state;
    birthDate = formatDateString(birthDate);
    this.nextLoading(() => {
      this.props
        .setResidency(
          {
            birthDate,
            birthPlace,
          },
          this.nextSection
        )
        .then(this.nextSection);
    });
  };

  render() {
    const { birthDate, birthPlace } = this.state;
    const sections = [
      <>
        <h2>
          Become a citizen of Avalon
        </h2>
        <h5>STEP 1</h5>
        <p>Before the local municipal authority can issue you an digital ID card for Avalon,
        you must provide the information requested below.</p>
        <br />
        <form onSubmit={this.handleSetResidency}>
          <Input
            placeholder="date of birth"
            onChange={evt =>
              this.handleChangeInput('birthDate', evt.target.rawValue)
            }
            value={birthDate}
            labelText="date of birth"
            placeholder="dd • mm • yyyy"
            options={{
              date: true,
              datePattern: ['d', 'm', 'Y'],
              delimiter: ' • ',
            }}
          />
          <Input
            onChange={evt =>
              this.handleChangeInput('birthPlace', evt.target.rawValue)
            }
            value={birthPlace}
            labelText="place of birth"
          />
          <Button className="mt-5" disabled={!birthDate || !birthPlace}>
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
        <h2>Become a citizen of Avalon</h2>
        <h5>STEP 2</h5>
        <p>
          Scan the QR code with your SmartWallet to save your new digital ID onto your device:
        </p>
        <br />
        <img src={this.props.qrCode} width={300} alt="qr code" />
      </>,
      <>
        <h2>Success</h2>
        <p>
          A digital ID card has been issued to your device.
          <br /><br />
          You can view your new digital ID in your SmartWallet (under the <i>Documents</i> tab).
        </p>
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
            width: 60.5rem;
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
    setResidency,
  }
)(Residency);

export default Residency;
