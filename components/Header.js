import SVG from 'react-inlinesvg';

const Header = ({ brandVersion = 'primary' }) => {
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
          onClick={() => console.log('Opens a pop-over full screen overlay')}
        >
          About
        </span>
      )}

      <style jsx>{`
        header {
          display: inline-flex;
          align-items: center;
          margin-bottom: 40px;
          z-index: 1;
        }
        header :global(.Logo svg .image) {
          opacity: ${isPrimaryBrandVersion ? 1 : 0.285673};
        }
        header:hover .Brand {
          visibility: visible;
          color: ${isPrimaryBrandVersion ? '' : '#fff'};
        }
        header:hover :global(.Logo svg .image) {
          opacity: 1;
        }
        .Brand {
          margin-left: 20px;
          text-transform: uppercase;
          visibility: ${isPrimaryBrandVersion ? 'visible' : 'hidden'};
          cursor: ${isPrimaryBrandVersion ? 'default' : 'pointer'};
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          line-height: 14px;
          letter-spacing: 2.6px;
        }
        .Brand a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
