const Footer = () => {
  return (
    <footer>
      scroll

      <style jsx>{`
        footer {
          position: fixed;
          bottom: 0;
          left: 50%;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        footer:after {
          content: '';
          width: 1px;
          height: 60px;
          background-image: linear-gradient(to bottom,rgba(255,241,223,0),rgba(255, 222, 188, 0.7));
        }
      `}</style>
    </footer>
  );
};

export default Footer;
