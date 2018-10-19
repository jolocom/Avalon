import { connect } from 'react-redux';

import { Overlay } from 'components';

import { setAboutOverlayState } from 'actions/ui';

let About = ({ setAboutOverlayState }) => {
  return (
    <Overlay onClose={() => setAboutOverlayState(false)}>
      <h1>About</h1>

      <p>
        This web experience is brought to you by <a href="https://jolocom.io">Jolocom</a>,
        to demonstrate how decentralized digital identity management can serve as a building
        block to revolutionize everyday interactions and activities.
      </p>
      <hr />

      <div className="Sections">
        <div>
          <p className="gray">
            Who owns your digital identity? <br />
            At Jolocom we build software systems that enable individual people,
            organizations, and smart agents to own and control the identity that defines them.
          </p>
          <p className="gray">
            Our vision is for a future in which every entity capable of any type of identity
            is equally capable of communicating and sharing information about itself.
          </p>
        </div>
        <div>
          <p className="gray">
            This interactive experience was built using our universal,{' '}
            <a
              href="https://jolocom.io/solution/"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source protocol for digital identity management.
            </a>
          </p>
          <p className="gray">
            Have a look at the technical documentation{' '}
            <a
              href="https://jolocom-lib.readthedocs.io/en/latest/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>.
          </p>
          <p className="gray">
            Want to learn how your sector can benefit from implementing Jolocom’s protocol?{' '}
            <a
              href="https://jolocom.io/solution/#conversation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>.
          </p>
        </div>
        <div className="Social">
          <h4>Follow us</h4>
          <ul className="Social__List">
            <li>
              <a
                href="https://twitter.com/GETJolocom"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://t.me/joinchat/BRZ49A1ysPrieF4drcIDow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/jolocom"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCmpF6TdeLM2H6XcpZI2ceBg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="https://stories.jolocom.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
            * {
              color: #FFEFDF;
            }

            .Sections {
              display: flex;
            }

            .Sections > div + div {
              margin-left: 40px;
            }

            .Social {
              white-space: nowrap;
            }
            .Social__List {
              margin: 0;
              padding: 0;
              list-style: none;
            }
            .Social__List a {
              color: #9B9B9F;
              font-size: 16px;
              line-height: 20px;
            }

            a:hover {
              color: #fff;
            }
          `}</style>
    </Overlay>
  );
};

About = connect(null, {
  setAboutOverlayState,
})(About);

export default About;