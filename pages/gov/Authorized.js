import { connect } from 'react-redux';
import { Button } from 'components';

let AuthorizedGovSpace = ({ user }) => {
  return (
    <div>
      <img
        src="https://placehold.it/280x40/?text=logo_of_imaginary_company"
        alt="imaginary company logo"
      />
      <img className="BarImage" src="/static/images/GOV_bg_bar.jpg" alt="bar image" />
      <h1>Welcome, {user.givenName}!</h1>
      <p>
        You are officialy registered as visitor.
      </p>
      <p>
        Now you can apply for documents that will give <br />
        you equal status with Lindberg citizens:
      </p>

      <ul>
        <li>
          <img
            src="/static/images/residency.jpg"
            srcSet="/static/images/residency@2.jpg 2x"
            alt=""
          />
          <h3>Get a temporary residency</h3>
          <p>
            Allows you to open your business, apply for a job or stay in the country ...
          </p>
          <Button>Apply</Button>
        </li>
        <li>
          <img
            src="/static/images/driving-permit.jpg"
            srcSet="/static/images/driving-permit@2.jpg 2x"
            alt=""
          />
          <h3>Get a driving permit</h3>
          <p>
            Allows you to open your business, apply for a job or stay in the country ...
          </p>
          <Button>Apply</Button>
        </li>
        <li>
          <img src="" alt="" />
          <h3>Open a private company</h3>
          <p>
            Allows you to open your business, apply for a job or stay in the country ...
          </p>
          <p className="small pink">Comming soon in this demo</p>
        </li>
      </ul>

      <style jsx>{`
          div {
            background-color: #fff;
            width: 100%;
            height: 100%;
            padding: 60px 50px;
          }
          div, p {
            color: #000;
          }
          .BarImage {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}</style>
    </div>
  );
};

AuthorizedGovSpace = connect(state => ({
  user: state.userData,
}))(AuthorizedGovSpace);

export default AuthorizedGovSpace;
