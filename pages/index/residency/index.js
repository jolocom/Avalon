import { Component } from 'react';
import { connect } from 'react-redux';

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
    const { setSection, mainSectionIndex } = this.props;
    const sections = [
      <>
        <h2>
          Become<br />a citizen of Avalon
        </h2>
        <h5>STEP 1</h5>
        <p>Before the local municipal authority can issue you an Avalon citizenship
        credential, you must provide certain personal information in the fields below.</p>
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
            labelText="country of birth"
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
        <h2>Become an Avalonian citizen</h2>
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
          A proof of citizenship has been issued to your device.
          <br /><br />
          You can view your new digital Avalon ID credential in your SmartWallet under <i>Documents</i>.
        </p>
        <Button
          flat
          pink
          className="mt-5"
          onClick={() => setSection(mainSectionIndex - 1)}
        >
          Return to home page
        </Button>
      </>,
    ];
    const currentSection = sections[this.state.sectionIndex];

    return (
      <div className="ta-c margin-center">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="imaginary city or country logo"
          className="AvalonLogo"
        />
        {typeof currentSection === 'function'
          ? React.createElement(currentSection)
          : currentSection}
        <style jsx>{`
          div {
            background-color: #fff;
            width: 60.5rem;
            padding: 2.5rem 7.33rem 3.33rem;
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
