import getCurrentUser from "./helpers/getCurrentUser";
import notNull from "./helpers/notNull";
import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export type GetEventInput = {
  eventId: Id<"events">;
};

export default query(async (ctx, input: GetEventInput) => {
  const { db } = ctx;
  const user = await getCurrentUser(ctx);

  const event = await db.get(input.eventId);
  if (!event) {
    return null;
  }

  const hostUser = await db.get(event.host);
  if (!hostUser) {
    return null;
  }

  const isCurrentUserHosting = user ? hostUser._id.equals(user._id) : false;

  // Get the attendees for this event.
  const attendees = await db
    .query("attendees")
    .filter((q) => q.eq(q.field("eventId"), event._id))
    .collect();

  // Get details for each of the attendees.
  const attendeeUsers = await Promise.all(
    attendees.map(async (attendee) => await db.get(attendee.userId))
  );
  const validAttendeeUsers = attendeeUsers.filter(notNull);

  const isCurrentUserAttending =
    user &&
    validAttendeeUsers.find((attendee) => attendee?._id.equals(user._id)) !==
      undefined;

  return {
    ...event,
    hostUser,
    isCurrentUserHosting,
    attendees: validAttendeeUsers,
    isCurrentUserAttending,
  };
});
