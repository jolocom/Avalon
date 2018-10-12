import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';

class Residency extends Component {
  state = {
    sectionIndex: 0,
  }

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })

  render() {
    const sections = [
      (
        <>
          <h1>Your Lingberg temporary residency</h1>
          <h5>STEP 1</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eum culpa corporis
            rem nisi minima, sit aut! Aperiam, fugiat sapiente eos incidunt cumque ratione enim
            maxime, quisquam dolores tempore asperiores.
          </p>
          <br />
          <input type="text" placeholder="date of birth" />
          <input type="text" placeholder="place of birth" />
          <Button onClick={this.nextSection}>
            Next
          </Button>
        </>
      ),
      (
        <>
          <h1>Your Lingberg temporary residency</h1>
          <h5>STEP 2</h5>
          <p>
            Scan the QR-code with SmartWallet:
          </p>
          <br />
          <img
            src="https://placehold.it/200x200/?text=qr-code-here"
            alt="qr code"
          />
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

Residency = connect()(Residency);

export default Residency;
