import { Id } from "convex/values";
import authenticatedMutation from "./helpers/authenticatedMutation";

export type CreateAttendeeInput = {
  eventId: Id;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: CreateAttendeeInput) => {
    // Prevent inserting duplicate attendees.
    const existingAttendee = await db
      .table("attendees")
      .filter((q) =>
        q.and(
          q.eq(q.field("eventId"), eventId),
          q.eq(q.field("userId"), user._id)
        )
      )
      .first();

    if (existingAttendee) {
      return null;
    }

    db.insert("attendees", {
      userId: user._id,
      eventId,
    });

    return eventId;
  }
);
