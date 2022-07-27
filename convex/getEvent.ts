import { Id } from "convex/values";
import getCurrentUser from "./helpers/getCurrentUser";
import { Document } from "./_generated/dataModel";
import { query } from "./_generated/server";

export type GetEventInput = {
  eventId: Id;
};

export default query(async (ctx, input: GetEventInput) => {
  const { db } = ctx;
  const user = await getCurrentUser(ctx);

  const event: Document<"events"> = await db.get(input.eventId);

  const hostUser: Document<"users"> = await db.get(event.host);

  const isCurrentUserHosting = user ? hostUser._id.equals(user._id) : false;

  // Get the attendees for this event.
  const attendees = await db
    .table("attendees")
    .filter((q) => q.eq(q.field("eventId"), event._id))
    .collect();

  // Get details for each of the attendees.
  const attendeeUsers = await Promise.all(
    attendees.map(
      async (attendee) => (await db.get(attendee.userId)) as Document<"users">
    )
  );

  const isCurrentUserAttending =
    attendeeUsers.find((attendee) => attendee._id.equals(user._id)) !==
    undefined;

  return {
    ...event,
    hostUser,
    isCurrentUserHosting,
    attendees: attendeeUsers,
    isCurrentUserAttending,
  };
});
