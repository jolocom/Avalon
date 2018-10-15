const Input = ({ type = 'text', labelText, value = '', onChange = () => {} }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
      <label>{labelText}</label>

      <style jsx>{`
        div {
          position: relative;
          display: inline-block;
          margin-top: 30px;
        }

        input,
        input:hover,
        input:active,
        input:focus {
          outline: 0;
        }
        input {
          border: none;
          border-bottom: 2px solid #05050d;
          color: #05050d;
          padding-bottom: 4px;
          width: 100%;
        }
        input:focus {
          border-color: #942f51;
        }

        input ~ label {
          color: #b5b5b7;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
          width: auto;
        }

        input:focus ~ label,
        input:not([value=""]) ~ label {
          top: -10px;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};

export default Input;
