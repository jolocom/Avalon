import classnames from 'classnames';

const Button = ({ className, full, ...props }) => (
  <button
    {...props}
    className={classnames(
      'Button',
      { full: full },
      className
    )}
  >
    {props.children}

    <style jsx>{`
      .Button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        padding: 15px 30px 13px;
        background: #942f51;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        outline: none;
        border: none;
        transition: transform .15s ease;
      }
      .Button[disabled] {
        background: #ffefdf;
        color: #05050d;
        pointer-events: none;
      }
      .Button.full {
        width: 100%;
      }
      .Button > :global(* + *) {
        margin-left: 10px;
      }

      .Button:hover {
        background: #8A2948;
      }

      .Button:active {
        transform: scale(0.95);
      }
    `}</style>
  </button>
);

export default Button;
