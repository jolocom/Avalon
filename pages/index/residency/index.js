import { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from 'components';
import { setResidency } from 'actions/user';

class Residency extends Component {
  state = {
    sectionIndex: 0,
    birthDate: '',
    birthPlace: '',
  }

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })
  handleChangeInput = (key, value) => this.setState({ [key]: value })
  handleSetResidency = evt => {
    evt.preventDefault();
    const { birthDate, birthPlace } = this.state;

    this.props.setResidency(
      {
        birthDate,
        birthPlace,
      },
      this.nextSection
    )
      .then(this.nextSection);
  }
  render() {
    const { birthDate, birthPlace } = this.state;
    const { setSection, mainSectionIndex } = this.props;
    const sections = [
      (
        <>
          <h1>Become <br /> an Avalonian citizen</h1>
          <h5>STEP 1</h5>
          <p>
            Please, provide additional information:
          </p>
          <br />
          <form onSubmit={this.handleSetResidency}>
            <Input
              placeholder="date of birth"
              onChange={evt => this.handleChangeInput('birthDate', evt.target.value)}
              value={birthDate}
              labelText="date of birth"
            />
            <Input
              placeholder="place of birth"
              onChange={evt => this.handleChangeInput('birthPlace', evt.target.value)}
              value={birthPlace}
              labelText="place of birth"
            />
            <Button
              className="mt"
              disabled={!birthDate || !birthPlace}
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
          <h1>Become an Avalonian citizen</h1>
          <h5>STEP 2</h5>
          <p>
            Scan the QR-code with the SmartWallet to save your new digital ID:
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
          <h1>It's time to celebrate!</h1>
          <p>
            Now, you can proudly call yourself an Avalonian citizen.
          </p>
          <br />
          <Button
            className="mt"
            onClick={() => setSection(mainSectionIndex - 1)}
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
          src="https://placehold.it/280x40/?text=logo_of_city/country"
          alt="imaginary city or country logo"
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
  setResidency,
})(Residency);

export default Residency;
