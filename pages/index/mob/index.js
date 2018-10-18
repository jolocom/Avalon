import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components';

import { initiateMobSSO } from 'actions/user';

class MobSpace extends Component {
  state = {
    sectionIndex: 0,
  }

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })

  handleSSO = () => {
    this.props.initiateMobSSO(this.nextSection)
      .then(this.nextSection);
  }

  render() {
    const sections = [
      (
        <div className="Landing">
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <main>
            <div>
              <h1>Slogan of your company</h1>
              <p>
                Teaser relevant in a tone of voice and message to a carsharing company audience.
              </p>
              <br />
              <Button onClick={this.nextSection}>
                Become a member
              </Button>
            </div>
          </main>

          <style jsx>{`
            main {
              flex: 1;
              display: inherit;
              max-width: 400px;
            }
            main > div {
              margin: auto;
            }
          `}</style>
        </div>
      ),
      (
        <div className="Content ta-c">
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <h1>Sign up as a new member</h1>
          <div>
            <img className="SocialButton" src="/static/images/fb_button.svg" />
          </div>
          <div>
            <img className="SocialButton" src="/static/images/google_button.svg" />
          </div>
          <Button full onClick={this.handleSSO}>
            <img
              src="/static/images/jolocom-icon-transparent.svg"
              alt="Jolocom logo"
              height={20}
              width={20}
            />
            <span>
              Continue with Jolocom
            </span>
          </Button>

          <style jsx>{`
            .SocialButton {
              width: 100%;
            }
          `}</style>
        </div>
      ),
      (
        <div className="Content ta-c">
          <img src="https://placehold.it/180x40?text=logo" alt="" />
          <h1>Sign up as a new member</h1>
          <h3>Scan the QR-code with your SmartWallet:</h3>
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
          .MobSpace :global(.Landing) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 5px 35px;
          }
          .MobSpace :global(.Landing div p) {
            color: #fff;
          }

          .MobSpace :global(.Content) {
            padding: 70px 80px;
            background-color: #fff;
            color: #05050D;
            width: 60%;
            margin: auto;
          }

          .MobSpace :global(.Landing),
          .MobSpace :global(.Content) {
            height: 90vh;
          }
        `}</style>
      </div>
    );
  }
}

MobSpace = connect(state => ({
  qrCode: state.qrCode,
}), {
  initiateMobSSO,
})(MobSpace);

export default MobSpace;
