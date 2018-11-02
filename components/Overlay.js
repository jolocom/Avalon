const Overlay = ({ onClose: handleClose, children }) => {
  return (
    <aside>
      <button onClick={handleClose}>
        <img src="/static/images/close.png" alt="close times button" />
      </button>
      {children}

      <style jsx>{`
        aside {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 10.83rem 11.67rem 0 9.17rem;
          background-color: #000;
          z-index: 100;
        }

        button {
          position: absolute;
          top: 68px;
          right: 66px;
          font-size: 30px;
          background: rgba(0,0,0,0);
          border: none;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </aside>
  );
};

export default Overlay;
