import { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from 'components';
import { getDrivingLicence } from 'actions/user';

class Residency extends Component {
  state = {
    sectionIndex: 0,
    residence: '',
    postalCode: '',
  }

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })
  handleChangeInput = (key, value) => this.setState({ [key]: value })
  handleGetDrivingLicence = evt => {
    evt.preventDefault();
    const { residence, postalCode } = this.state;

    this.props.getDrivingLicence(
      {
        residence,
        postalCode,
      },
      this.nextSection
    )
      .then(this.nextSection);
  }
  render() {
    const { residence, postalCode } = this.state;
    const { setSection, mainSectionIndex } = this.props;
    const sections = [
      (
        <>
          <h1>Get Avalonian driver's licence</h1>
          <h5>STEP 1</h5>
          <p>
            Please, provide additional information:
          </p>
          <br />
          <form onSubmit={this.handleGetDrivingLicence}>
            <Input
              placeholder="residence"
              onChange={evt => this.handleChangeInput('residence', evt.target.value)}
              value={residence}
              labelText="residence"
            />
            <Input
              placeholder="postal code"
              onChange={evt => this.handleChangeInput('postalCode', evt.target.value)}
              value={postalCode}
              labelText="postal code"
            />
            <Button
              className="mt-5"
              disabled={!residence || !postalCode}
            >
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
        </>
      ),
      (
        <>
          <h1>Get Avalonian driver's licence</h1>
          <h5>STEP 2</h5>
          <p>
            Scan the QR-code with the SmartWallet to save your driver's licence:
          </p>
          <br />
          <img
            src={this.props.qrCode}
            width={300}
            alt="qr code"
          />
        </>
      ),
      (
        <>
          <h1>It's time to drive!</h1>
          <p>
            You have succefully received Avalonian driver’s licence. Please, drive carefully:
            be fast, but never furious.
          </p>
          <br />
          <Button
            flat
            pink
            className="mt-5"
            onClick={() => setSection(mainSectionIndex - 2)}
          >
            Return to home page
          </Button>
        </>
      ),
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

Residency = connect(state => ({
  qrCode: state.qrCode,
}), {
  getDrivingLicence,
})(Residency);

export default Residency;
