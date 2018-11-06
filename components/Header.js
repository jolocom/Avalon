import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

import { setAboutOverlayState } from 'actions/ui';

let Header = ({ brandVersion = 'primary', setAboutOverlayState }) => {
  const isPrimaryBrandVersion = brandVersion === 'primary';

  return (
    <header>
      <SVG className="Logo" src="/static/images/jolocom-icon-transparent.svg">
        <img src={'/static/images/jolocom-icon-transparent.svg'} alt="Jolocom's logo" />
      </SVG>
      {isPrimaryBrandVersion ? (
        <span className="Brand">
          powered by <a href="https://jolocom.io" target="_blank">jolocom</a>
        </span>
      ) : (
        <span
          className="Brand"
          onClick={() => setAboutOverlayState(true)}
        >
          About
        </span>
      )}

      <style jsx>{`
        header {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin-bottom: 40px;
          z-index: 1;
        }
        header :global(.Logo svg .image) {
          opacity: ${isPrimaryBrandVersion ? 1 : 0.285673};
          transition: opacity .4s;
        }
        header:hover .Brand {
          color: ${isPrimaryBrandVersion ? '' : '#fff'};
          opacity: 1;
        }
        header:hover :global(.Logo svg .image) {
          opacity: 1;
        }
        .Brand {
          margin-left: 20px;
          text-transform: uppercase;
          opacity: ${isPrimaryBrandVersion ? 1 : 0};
          cursor: ${isPrimaryBrandVersion ? 'default' : 'pointer'};
          color: rgba(255, 255, 255, 0.4);
          font-size: 1rem;
          line-height: 12px;
          letter-spacing: 2.6px;
          transition: ${isPrimaryBrandVersion ? 'none' : 'opacity .4s'};
        }
        .Brand a {
          color: rgba(255,255,255,0.4);
          transition: color .4s;
          text-decoration: none;
        }
        .Brand a:hover {
          color: #fff;
        }
      `}</style>
    </header>
  );
};

Header = connect(null, {
  setAboutOverlayState,
})(Header);

export default Header;
