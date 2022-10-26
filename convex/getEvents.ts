import asyncFilter from './helpers/asyncFilter';
import authenticatedQuery from './helpers/authenticatedQuery';

export default authenticatedQuery(async ({ db }, user) => {
  const allEvents = await db.query('events').collect();

  // Filter out events that the user is not hosting or attending.
  const availableEvents = await asyncFilter(allEvents, async (event) => {
    const attendees = await db
      .query('attendees')
      .filter((q) =>
        q.and(
          q.eq(q.field('eventId'), event._id),
          q.eq(q.field('userId'), user._id)
        )
      )
      .collect();

    const userAttending = attendees.length > 0;
    const userHosting = event.host.equals(user._id);

    return userAttending || userHosting;
  });

  return Promise.all(
    availableEvents.map(async (event) => {
      // Get the user for this host.
      const host = await db.get(event.host);
      if (!host) {
        return null;
      }

      // Get the attendees for this event.
      const attendees = await db
        .query('attendees')
        .filter((q) => q.eq(q.field('eventId'), event._id))
        .collect();

      return {
        ...event,
        hostDetails: {
          name: host.name,
          isCurrentUser: host._id.equals(user._id),
        },
        availableSlots: event.slots - attendees.length,
      };
    })
  );
});
