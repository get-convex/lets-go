import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '../../../convex/_generated/react';
import { useAuth } from '../../hooks/auth.hooks';
import EventDetails from '../EventDetails/EventDetails';
import './Invitation.scss';

const Invitation = () => {
  const { inviteCode } = useParams();
  const event = useQuery('getEventByInviteCode', {
    inviteCode,
  });
  const { isLoading, isSignedIn, signIn } = useAuth();
  const createAttendee = useMutation('createAttendee');
  const navigate = useNavigate();

  if (!event) {
    return <p>Loading...</p>;
  }

  const handleAcceptInvite = async () => {
    const result = await createAttendee({ eventId: event._id });

    if (result) {
      navigate('/events?ref=inviteAccepted');
    }
  };

  return (
    <div className="Invitation">
      <div className="Invitation__title">You've been invited to:</div>
      <div className="Invitation__card">
        <EventDetails eventId={event._id} />
        <div className="Invitation__card__footer">
          {event.availableSlots > 0 ? (
            <>
              Are you attending?
              {!isSignedIn && (
                <Button type="primary" size="large" onClick={signIn}>
                  Sign in to accept
                </Button>
              )}
              {isSignedIn &&
                (event.isCurrentUserAttending ? (
                  <strong>Yes!</strong>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleAcceptInvite}
                  >
                    Accept
                  </Button>
                ))}
            </>
          ) : (
            <p>Sorry, this event is already at capacity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invitation;
