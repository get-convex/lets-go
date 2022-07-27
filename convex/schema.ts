import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  attendees: defineTable({
    eventId: s.id(),
    userId: s.id(),
  }),
  events: defineTable({
    description: s.string(),
    endDate: s.string(),
    host: s.id(),
    inviteCode: s.string(),
    slots: s.number(),
    startDate: s.string(),
    title: s.string(),
  }),
  users: defineTable({
    email: s.union(s.string(), s.null()),
    name: s.string(),
    photo: s.union(s.string(), s.null()),
    tokenIdentifier: s.string(),
  }),
});
