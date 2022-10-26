import authenticatedMutation from "./helpers/authenticatedMutation";
import { Id } from "./_generated/dataModel";

export type DeleteAttendeeInput = {
  eventId: Id<"events">;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: DeleteAttendeeInput) => {
    // Find the attendee to delete.
    const attendee = await db
      .query("attendees")
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
