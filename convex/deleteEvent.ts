import authenticatedMutation from "./helpers/authenticatedMutation";
import { Id } from "./_generated/dataModel";

export type DeleteEventInput = {
  eventId: Id<"events">;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: DeleteEventInput) => {
    const event = await db.get(eventId);
    if (!event) {
      return null;
    }

    if (event.host.equals(user._id)) {
      // Delete all the attendees for this event.
      const attendees = await db
        .query("attendees")
        .filter(q => q.eq(q.field("eventId"), eventId))
        .collect();
      attendees.forEach(attendee => db.delete(attendee._id));

      // Delete the event itself.
      db.delete(eventId);
    }
  }
);
