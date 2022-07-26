import getCurrentUser from "./helpers/getCurrentUser";
import { query } from "./_generated/server";

export type GetEventInput = {
  inviteCode?: string;
};

export default query(async (ctx, input: GetEventInput) => {
  const { db } = ctx;
  const user = await getCurrentUser(ctx);

  const event = await db
    .query("events")
    .filter((q) => q.eq(q.field("inviteCode"), input.inviteCode || ""))
    .unique();

  // Get the attendees for this event.
  const attendees = await db
    .query("attendees")
    .filter((q) => q.eq(q.field("eventId"), event._id))
    .collect();

  // Get details for each of the attendees.
  const attendeeUsers = await Promise.all(
    attendees.map(async (attendee) => await db.get(attendee.userId))
  );

  const isCurrentUserAttending = user
    ? attendeeUsers.find((attendee) => attendee?._id.equals(user._id)) !==
      undefined
    : false;

  return {
    ...event,
    isCurrentUserAttending,
    availableSlots: event.slots - attendees.length,
  };
});
