import { QueryCtx } from 'convex/server';
import { DataModel } from '../_generated/dataModel';

const getCurrentUser = async ({ auth, db }: QueryCtx<DataModel>) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  return await db
    .query('users')
    .filter((q) => q.eq(q.field('tokenIdentifier'), identity?.tokenIdentifier))
    .unique();
};

export default getCurrentUser;
