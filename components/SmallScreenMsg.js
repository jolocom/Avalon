const SmallScreenMsg = () => {
  return (
    <main>
      <div className="Content">
        <img
          src="/static/images/enlarge_screen_image.svg"
          alt="arrows in every direction of the world"
        />

        <p>
          This experience has a desktop version only (for now). <br />
          If you see this message, please switch to your laptop and maximize the browser window to
          the full width of your device screen.
        </p>

      </div>
      <style jsx>{`
        main {
          background: #05050D;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Content {
          width: 20.83rem;
          text-align: center;
        }

        img {
          width: 11.17rem;
        }

        p {
          color: #FFEFDF;
        }
      `}</style>
    </main>
  );
};

export default SmallScreenMsg;
