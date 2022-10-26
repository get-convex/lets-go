import moment from "moment";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "../../../convex/_generated/react";
import "./EventDetails.scss";

interface EventDetailsProps {
  eventId: Id<"events">;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const eventData = useQuery("getEvent", { eventId });

  return (
    <div className="EventDetails">
      <div className="EventDetails__title">{eventData?.title}</div>
      <div className="EventDetails__description">{eventData?.description}</div>
      <div className="EventDetails__details">
        <div className="EventDetails__details__detail">
          <strong>When:</strong>
          <span>{moment(eventData?.startDate).calendar()}</span>
        </div>
        <div className="EventDetails__details__detail">
          <strong>Host:</strong>
          <div className="EventDetails__user">
            {eventData?.hostUser?.photo && (
              <img
                width="28"
                height="28"
                src={eventData?.hostUser?.photo}
                referrerPolicy="no-referrer"
              />
            )}
            {eventData?.hostUser?.name}
          </div>
        </div>
        <div className="EventDetails__details__detail">
          <strong>Slots:</strong>
          <span>
            {(eventData?.slots || 0) - (eventData?.attendees.length || 0)} /{" "}
            {eventData?.slots} available
          </span>
        </div>
        {eventData?.attendees && eventData.attendees.length > 0 && (
          <div className="EventDetails__details__detail EventDetails__details__detail--vertical">
            <strong>Confirmed attendees:</strong>
            <ul className="EventDetails__attendees">
              {eventData?.attendees?.map((attendee) => (
                <li
                  key={attendee._id.toString()}
                  className="EventDetails__user"
                >
                  {attendee.photo && (
                    <img
                      src={attendee.photo}
                      width="28"
                      height="28"
                      alt={`Profile photo for ${attendee.name}`}
                    />
                  )}
                  {attendee.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
