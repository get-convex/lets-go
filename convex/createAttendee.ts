import authenticatedMutation from "./helpers/authenticatedMutation";
import { Id } from "./_generated/dataModel";

export type CreateAttendeeInput = {
  eventId: Id<"events">;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: CreateAttendeeInput) => {
    const event = await db.get(eventId);
    if (!event) {
      return null;
    }

    // Ensure there's still an open slot.
    const attendees = await db
      .query("attendees")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .collect();
    if (attendees.length >= event?.slots) {
      return null;
    }

    // Prevent inserting duplicate attendees.
    const existingAttendee = await db
      .query("attendees")
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
