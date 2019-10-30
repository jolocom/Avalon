import { connect } from 'react-redux';
import { Button } from 'components';
import Link from 'next/link';
import React from 'react';
import { setAboutOverlayState } from 'actions/ui';

let AuthorizedGovSpace = ({ user, setSection, mainSectionIndex, setAboutOverlayState }) => {
  const services = [
    {
      name: 'residency',
      img: 'residency',
      title: 'Apply for citizenship',
      description:
        'For individuals wishing to extend their stay or establish long-term residency.',
      onApply: () => setSection(mainSectionIndex + 1),
      url: '/index/residency',
    },
    {
      name: 'drivingLicence',
      img: 'driving-permit',
      title: 'Request a driving permit',
      description:
        'For individuals wishing to operate any class of motor vehicle, including rentals.',
      onApply: () => setSection(mainSectionIndex + 2),
      url: '/index/drivingLicence',
    },
  ];

  return (
    <div className="Authorized">
      <div className="topBar">
        <div
          onClick={
            () => {
              setAboutOverlayState(true);
            }
          }
        >
          <img
            src={'/static/favicon/apple-touch-icon.png'}
            width={40}
            height={40}
            alt="Jolocom's logo"
          />
          <text>About</text>
        </div>
      </div>
      <div className="Authorized__Content">
        <img
          src="/static/images/Avalon_logo.svg"
          alt="Avalon logo"
          className="AvalonLogo"
        />
        <h1 style={{ marginBottom: '1rem' }}>Welcome, {user.givenName}!</h1>
        <p style={{ marginTop: 0, fontSize: '1.67rem', lineHeight: '2.5rem' }}>
          The following online services are available:
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
                <Link href={service.url}>
                  <Button
                    style={{ marginTop: '2.5rem' }}
                  >
                    Apply
                  </Button>
                </Link>
              )}
            </li>
          ))}
          <li className="Service">
            <img src="/static/images/business.png" alt="" width="230" />
            <h3>Register a business</h3>
            <p className="Service__Description medium gray mt-1">
              For any person or organisation wishing to start a new company or
              move existing operations to Avalon.
            </p>
            <p className="small pink">Coming soon in this demo</p>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .Authorized {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          alignItems: flex-start;
        }
        
        .topBar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10rem;
        }
        
        .topBar div {
          border: 1px solid blue;
          margin-left: 50px;
          margin-top: 25px;
          height: 60px;
          width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .topBar text {
          color: black;
          font-size: 20px;
          font-we
        }

        h1 {
          line-height: 4.83rem;
          color: #05050d;
        }
        
        p {
          color: #05050d;
        }
        
        .Authorized__Content {
          margin-top: 10rem;
          alignSelf: center;
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
          color: #05050d;
        }
        .Service__Description {
          margin-top: 1.67rem !important;
          margin-bottom: 0;
          line-height: 1.83rem;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
});

AuthorizedGovSpace = connect(
  mapStateToProps,
  { setAboutOverlayState },
)(AuthorizedGovSpace);

export default AuthorizedGovSpace;
