import { connect } from 'react-redux';
import { Button } from 'components';

let AuthorizedGovSpace = ({ user, setSection, mainSectionIndex }) => {
  const services = [
    {
      name: 'residency',
      img: 'residency',
      title: 'Apply for citizenship',
      description:
        'Being an Avalon citizen allows you to stay self-employed, get a job without a work visa, have an official clone, etc.',
      onApply: () => setSection(mainSectionIndex + 1),
    },
    {
      name: 'drivingLicence',
      img: 'driving-permit',
      title: 'Get a driving permit',
      description:
        'Allows you to rent&drive any ground electric vehicle (except trains and military transport) or import your own.',
      onApply: () => setSection(mainSectionIndex + 2),
    },
  ];

  return (
    <div className="Authorized">
      <img
        className="BarImage"
        src="/static/images/GOV_bg_bar.jpg"
        alt="bar image"
      />
      <div className="Authorized__Content">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="Avalon logo"
          className="AvalonLogo"
        />
        <h1 style={{ marginBottom: '1rem' }}>Welcome, {user.givenName}!</h1>
        <p style={{ marginTop: 0, fontSize: '1.67rem', lineHeight: '2.5rem' }}>
          Discover what services the Government <br />
          of Avalon can offer you:
        </p>

        <ul>
          {services.map(service => (
            <li className="Service">
              <img
                src={`/static/images/${service.img}.jpg`}
                srcSet={`/static/images/${service.img}@2x.jpg 2x`}
                alt=""
              />
              <h3>{service.title}</h3>
              <p className="Service__Description medium gray mt-1">
                {service.description}
              </p>
              {user[service.name] ? (
                <div className="success-text" style={{ marginTop: '3.75rem' }}>
                  <img
                    src="/static/images/verified_green.svg"
                    style={{ transform: 'translate(-0.5rem, 3px)' }}
                  />
                  Completed
                </div>
              ) : (
                <Button
                  onClick={service.onApply}
                  style={{ marginTop: '2.5rem' }}
                >
                  Apply
                </Button>
              )}
            </li>
          ))}
          <li className="Service">
            <img src="/static/images/business.png" alt="" width="230" />
            <h3>Open a business</h3>
            <p className="Service__Description medium gray mt-1">
              For any person or organisation wishing to start a new company or
              move existing operations to Avalon.
            </p>
            <p className="small pink">Comming soon in this demo</p>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .Authorized {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        h1 {
          line-height: 4.83rem;
          color: #05050d;
        }

        .Authorized__Content {
          width: 100%;
          padding-top: 5rem;
          padding-left: 4.17rem;
          overflow: auto;
        }

        .BarImage {
          height: 100vh;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .Service {
          padding-left: 1.67rem;
          margin-right: 6.67rem;
          width: 20.33rem;
          display: inline-block;
          height: 37.75rem;
        }
        .Service > img {
          width: 19.17rem;
        }
        .Service h3 {
          font-family: TTCommons-DemiBold;
          margin-top: 1.67rem;
          font-weight: 400;
        }
        .Service__Description {
          margin-top: 1.67rem !important;
          margin-bottom: 0;
          line-height: 1.83rem;
        }
        .Service {
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
