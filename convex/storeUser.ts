import { mutation } from "./_generated/server";

// Insert or update the user in a Convex table then return the document's Id.
//
// The `UserIdentity` returned from `auth.getUserIdentity` is just an ephemeral
// object representing the identity of the authenticated user; most applications
// will want to store this in a `users` table to reference it in their other
// tables.
//
// The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
// to look up identities, but inserting the value into a table also gives us an
// `_id` field.
//
// Keep in mind that `UserIdentity` has a number of optional fields, the
// presence of which depends on the identity provider chosen. It's up to the
// application developer to determine which ones are available and to decide
// which of those need to be persisted.
export default mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called storeUser without authentication present.");
  }

  // Check if we've already stored this identity before.
  const user = await db
    .query("users")
    .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .first();

  if (user !== null) {
    // If we've seen this identity before but the name has changed, update the value.
    if (identity.name && user.name !== identity.name) {
      user.name = identity.name;
      db.patch(user._id, user);
    }
    return user._id;
  }

  // If it's a new identity, create a new `User`.
  return db.insert("users", {
    // The `_id` field will be assigned by the backend.
    name: identity.name!,
    tokenIdentifier: identity.tokenIdentifier,
    email: identity.email || null,
    photo: identity.pictureUrl || null,
  });
});
