import { Overlay } from 'components';

const About = ({ onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <h2>About</h2>

      <p className="big">
        This web experience is brought to you by <a href="https://jolocom.io">Jolocom</a>,
        to demonstrate how decentralized digital identity management can serve as a building
        block to revolutionize everyday interactions and activities.
      </p>
      <hr />

      <div className="Sections">
        <div>
          <p>
            Who owns your digital identity? <br />
            At Jolocom we build software systems that enable individual people,
            organizations, and smart agents to own and control the identity that defines them.
            <br /><br />
            Our vision is for a future in which every entity capable of any type of identity
            is equally capable of communicating and sharing information about itself.
          </p>
        </div>
        <div>
          <p>
            This interactive experience was built using our universal,{' '}
            <a href="https://jolocom.io/solution/" target="_blank">
              open source protocol for digital identity management
            </a>.
            <br /><br />
            Have a look at the technical documentation{' '}
            <a href="https://jolocom-lib.readthedocs.io/en/latest/index.html" target="_blank">here</a>.
            <br /><br />
            Want to learn how your sector can benefit from implementing Jolocom’s protocol?{' '}
            <a href="https://jolocom.io/solution/#conversation" target="_blank">Contact us</a>.
          </p>
        </div>
        <div className="Social">
          <p>
            <h4>Follow us</h4>
            <ul className="Social__List">
              <li>
                <a href="https://twitter.com/GETJolocom" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/joinchat/BRZ49A1ysPrieF4drcIDow" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://github.com/jolocom" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCmpF6TdeLM2H6XcpZI2ceBg" target="_blank" rel="noopener noreferrer">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://stories.jolocom.com/" target="_blank" rel="noopener noreferrer">
                  Medium
                </a>
              </li>
            </ul>
          </p>

        </div>
      </div>

      <style jsx>{`
        * {
          color: #FFEFDF;
        }

        h2 {
          font-size: 4.67rem!important;
          color: #FFEFDF;
          margin-top: 0;
          margin-bottom: 2.5rem;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 1.17rem;
        }

        hr {
          opacity: .3;
        }
        
        p a {
          color: #fff;
          text-decoration: none;
        }

        .Sections {
          display: flex;
        }
        .Sections p {
          color: #9B9B9F;
          margin-top: 1.67rem;
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
        .Social__List li {
          display: flex;
          font-size: 16px;
          line-height: 20px;
        }
        .Social__List * + * {
          margin-top: 0.92rem;
        }
        .Sections a {
          color: #9B9B9F;
          text-decoration: underline;
        }

        .Sections a:hover {
          color: #FFDEBC;
          text-decoration: none;
        }
      `}</style>
    </Overlay>
  );
};

export default About;
