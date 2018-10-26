import { connect } from 'react-redux';
import { Button } from 'components';

let AuthorizedGovSpace = ({ user, setSection, mainSectionIndex }) => {
  const services = [
    {
      name: 'residency',
      img: 'residency',
      title: 'Apply for citizenship',
      description: 'Being an Avalon citizen allows you to stay self-employed, get a job without a work visa, have an official clone, etc.',
      onApply: () => setSection(mainSectionIndex + 1),
    },
    {
      name: 'drivingLicence',
      img: 'driving-permit',
      title: 'Get a driving permit',
      description: 'Allows you to rent&drive any ground electric vehicle (except trains and military transport) or import your own.',
      onApply: () => setSection(mainSectionIndex + 2),
    },
  ];

  return (
    <div className="Authorized">
      <img className="BarImage" src="/static/images/GOV_bg_bar.jpg" alt="bar image" />
      <div className="Authorized__Content">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="Avalon logo"
          className="AvalonLogo"
        />
        <h1 style={{ marginBottom: '1rem' }}>Welcome, {user.givenName}!</h1>
        <p style={{ marginTop: 0 }}>
          Discover what services the Government <br />of Avalon can offer you:
        </p>

        <ul>
          {services.map(service => (
            <li>
              <img
                src={`/static/images/${service.img}.jpg`}
                srcSet={`/static/images/${service.img}@2x.jpg 2x`}
                alt=""
              />
              <h3>{service.title}</h3>
              <p className="medium gray">
                {service.description}
              </p>
              {user[service.name] ? (
                <span className="green-text">Completed</span>
              ) : (
                <Button onClick={service.onApply}>Apply</Button>
              )}
            </li>
          ))}
          <li>
            <img src="https://placehold.it/230x120/?text=Private company" alt="" />
            <h3>Open a private company</h3>
            <p className="medium gray">
              Allows you to open your business, apply for a job or stay in the country …
              something funny goes here.
            </p>
            <p className="small pink">Comming soon in this demo</p>
          </li>
        </ul>
      </div>

      <style jsx>{`
          .Authorized {
            display: inline-flex;
            width: 100%;
            min-height: 100vh;
            color: #000;
            overflow: auto;
          }

          .Authorized__Content {
            padding: 60px 50px;
          }

          .BarImage {
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
