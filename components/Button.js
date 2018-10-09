export default props => (
  <button
    className="Button"
    {...props}
  >
    {props.children}

    <style jsx>{`
      .Button {
        display: inline-block;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        padding: 13px 30px;
        background: #942f51;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        outline: none;
        border: none;
        transition: transform .15s ease;
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
