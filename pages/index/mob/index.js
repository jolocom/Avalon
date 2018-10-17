import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';

import { initiateLogin } from '../../../actions/auth';

class MobSpace extends Component {
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
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <h1>Slogan of your company</h1>
          <p>
            Teaser relevant in a tone of voice and message to a carsharing company audience.
          </p>
          <br />
          <Button onClick={() => this.handleInitiateLogin()}>
            Become a member
          </Button>
        </div>
      ),
      (
        <div className="half-width margin-center ta-c">
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <h1>Sign up as a new member</h1>
          <img src="/static/fb_button" width={300} />
          <img src="/static/google_button" width={300} />
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
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <h1>Sign up as a new member</h1>
          <h2>Scan the QR-code with your SmartWallet:</h2>
          <img src={this.props.qrCode} width={300} />
        </div>
      ),
    ];

    const currentSection = sections[this.state.sectionIndex];
    return (
      <div className="MobSpace">
        {typeof currentSection === 'function'
          ? React.createElement(currentSection, this.props)
          : currentSection}
        <style jsx>{`
          div,
          div :global(p) {
            color: #000;
          }

          .MobSpace > :global(div:first-child) {
            background-color: #fff;
            padding: 70px 80px;
          }
          .MobSpace :global(.half-width) {
            width: 50%;
          }
        `}</style>
      </div>
    );
  }
}

MobSpace = connect(state => ({
  qrCode: state.qrCode,
}), {
  initiateLogin,
})(MobSpace);

export default MobSpace;
