import authenticatedMutation from "./helpers/authenticatedMutation";
import { Id } from "./_generated/dataModel";

export type CreateAttendeeInput = {
  eventId: Id<"events">;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: CreateAttendeeInput) => {
    // Prevent inserting duplicate attendees.
    const existingAttendee = await db
      .query("attendees")
      .filter(q =>
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
