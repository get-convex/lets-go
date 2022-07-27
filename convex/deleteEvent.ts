import { Id } from "convex/values";
import authenticatedMutation from "./helpers/authenticatedMutation";
import { Document } from "./_generated/dataModel";

export type DeleteEventInput = {
  eventId: Id;
};

export default authenticatedMutation(
  async ({ db }, user, { eventId }: DeleteEventInput) => {
    const event: Document<"events"> = await db.get(eventId);

    if (event.host.equals(user._id)) {
      // Delete all the attendees for this event.
      const attendees = await db
        .table("attendees")
        .filter((q) => q.eq(q.field("eventId"), eventId))
        .collect();
      attendees.forEach((attendee) => db.delete(attendee._id));

      // Delete the event itself.
      db.delete(eventId);
    }
  }
);
