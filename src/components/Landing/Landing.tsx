import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hooks';
import './Landing.scss';

const Landing = () => {
  const { signIn, isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="Landing">
      <div className="Landing__header">
        <img src="/logo.svg" alt="Let's Go logo" />
        <button type="button" onClick={signIn}>
          Sign in
        </button>
      </div>
      <div className="Landing__hero">
        <div className="Landing__hero__text">
          <h1>Fill your dinner table</h1>
          <span>Schedule meetings without the back-and-forth emails</span>
          <button className="Landing__button" onClick={signIn}>
            Create event
          </button>
          <img src="/star.svg" alt="" />
        </div>
        <div className="Landing__hero__image">
          <img
            className="Landing__hero__image__screenshot"
            src="/screenshot.png"
            alt="Let's Go screenshot"
          />
          <img
            className="Landing__hero__image__highlight"
            src="/highlight.svg"
            alt=""
          />
          <img
            className="Landing__hero__image__curve"
            src="/curve.svg"
            alt=""
          />
        </div>
      </div>
      <div className="Landing__steps">
        <h2>Unbelievably Easy-to-Use</h2>
        <ol>
          <li>
            <strong>Create events</strong>
            <span>
              Organize your schedule and create events. It's easy to keep track
              of your events and participate in friends events.
            </span>
          </li>
          <li>
            <strong>Invite friends</strong>
            <span>
              Share events with co-workers and friends very easily. Intuitive
              system simplifies the invitation process.
            </span>
          </li>
          <li>
            <strong>Enjoy</strong>
            <span>
              Enjoy the convenient process of creating events together with
              friends! No one has come up with a better tool yet.
            </span>
          </li>
        </ol>
      </div>

      <div className="Landing__convex">
        <div className="Landing__convex__content">
          <strong>Built on</strong>
          <img
            className="Landing__convex__logo"
            src="/convex.svg"
            alt="Convex logo"
          />
          <a className="Landing__button" href="https://www.convex.dev/">
            Learn more
          </a>
        </div>
        <img
          className="Landing__convex__screenshots"
          src="/screenshot-stack.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
