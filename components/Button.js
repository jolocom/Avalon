import classnames from 'classnames';
import SVG from 'react-inlinesvg';

const logoPath = '/static/images/jolocom-icon-transparent.svg';

const Button = ({ className, full, flat, pink, withLogo, ...props }) => (
  <button
    {...props}
    className={classnames(
      'Button',
      { full: full },
      { 'Button--flat': flat },
      { 'Button--pink': pink },
      className
    )}
  >
    {withLogo && (
      <SVG className="Logo" src={logoPath}>
        <img src={logoPath} alt="Jolocom's logo" />
      </SVG>
    )}
    <span>{props.children}</span>

    <style jsx>{`
      .Button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        padding: 13px 30px;
        background: #942f51;
        color: #fff;
        font-size: 1.67rem;
        line-height: 20px;
        outline: none;
        border: none;
        transition: transform 0.15s ease;
      }
      .Button[disabled] {
        background: #ffefdf;
        color: #05050d;
        pointer-events: none;
      }
      .Button.full {
        width: 100%;
      }
      .Button--flat {
        font-size: 1.5rem;
        background: none;
      }
      .Button--pink {
        color: #942f51;
      }

      .Button:hover {
        background: #8a2948;
      }
      .Button--flat:hover {
        background: none;
      }

      .Button:active {
        transform: scale(0.95);
      }

      .Button :global(.Logo) {
        width: 28px;
        margin-right: 12px;
      }
      .Button :global(.Logo .image) {
        opacity: 1;
      }
      .Button :global(.Logo) ~ * {
        margin-top: 3px;
      }
    `}</style>
  </button>
);

export default Button;
