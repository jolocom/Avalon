import { connect } from 'react-redux';
import { Button } from 'components';

let AuthorizedGovSpace = ({ user }) => {
  const services = [
    {
      img: 'residency',
      title: 'Get a temporary residency',
      description: 'Allows you to open your business, apply for a job or stay in the country ...',
    },
    {
      img: 'driving-permit',
      title: 'Get a driving permit',
      description: 'Allows you to open your business, apply for a job or stay in the country ...',
    },
  ];

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
        {services.map(service => (
          <li>
            <img
              src={`/static/images/${service.img}.jpg`}
              srcSet={`/static/images/${service.img}@2.jpg 2x`}
              alt=""
            />
            <h3>{service.title}</h3>
            <p className="medium gray">
              {service.description}
            </p>
            <Button>Apply</Button>
          </li>
        ))}
        <li>
          <img src="https://placehold.it/230x120/?text=Private company" alt="" />
          <h3>Open a private company</h3>
          <p className="medium gray">
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
            display: flex;
            flex-wrap: wrap;
          }

          li {
            flex: 1;
            padding-right: 50px;
            padding-left: 20px;
          }

          li:hover,
          li:hover p {
            color: #942f51 !important;
          }

          li {
            border-left: 1px solid #ececec;
          }
        `}</style>
    </div>
  );
};

AuthorizedGovSpace = connect(state => ({
  user: state.userData,
}))(AuthorizedGovSpace);

export default AuthorizedGovSpace;
