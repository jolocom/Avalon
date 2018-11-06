import Cleave from 'cleave.js/react';

const DEFAULT_OPTIONS = {
  blocks: [99999],
  delimiter: '',
};

const Input = ({
  type = 'text', labelText, value = '', options = DEFAULT_OPTIONS,
  onChange = () => {}, ...other
}) => {
  return (
    <div className="Input">
      <Cleave
        type={type}
        value={value}
        onChange={onChange}
        options={options}
        {...other}
      />
      <label>{labelText}</label>

      <style jsx>{`
        .Input {
          position: relative;
          display: inline-block;
          margin-top: 30px;
        }

        .Input :global(input),
        .Input :global(input:hover),
        .Input :global(input:active),
        .Input :global(input:focus) {
          outline: 0;
        }
        .Input :global(input) {
          border: none;
          border-bottom: 2px solid #05050d;
          color: #05050d;
          padding-bottom: 4px;
          width: 100%;
          font-size: 1.67rem;
        }
        .Input :global(input:focus) {
          border-color: #942f51;
        }
        .Input :global(input::placehoder),
        .Input :global(input::-webkit-input-placeholder) {
          line-height: 2.5rem;
          color: #b5b5b7;
        }

        .Input :global(input ~ label) {
          background: #fff;
          color: #b5b5b7;
          font-size: 1.67rem;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 0;
          top: 50%;
          width: 100%;
          text-align: left;
          transform: translateY(-50%);
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }

        .Input :global(input:focus ~ label),
        .Input :global(input:not([value=""]) ~ label) {
          top: -10px;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};

export default Input;
