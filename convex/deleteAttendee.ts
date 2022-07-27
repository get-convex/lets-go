import { Id } from "convex/values";
import authenticatedMutation from "./helpers/authenticatedMutation";

export type DeleteAttendeeInput = {
  eventId: Id;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: DeleteAttendeeInput) => {
    // Find the attendee to delete.
    const attendee = await db
      .table("attendees")
      .filter((q) =>
        q.and(
          q.eq(q.field("eventId"), eventId),
          q.eq(q.field("userId"), user._id)
        )
      )
      .first();

    attendee && db.delete(attendee._id);
  }
);
