import { PublicQuery } from 'convex/server';
import { DataModel, Document } from '../_generated/dataModel';
import { query, QueryCtx } from '../_generated/server';
import getCurrentUser from './getCurrentUser';

function authenticatedQuery<Args extends any[], ReturnType>(
  queryFunc: (
    ctx: QueryCtx,
    user: Document<'users'>,
    ...args: Args
  ) => Promise<ReturnType>
): PublicQuery<DataModel, Args, Promise<ReturnType>> {
  const wrappedFunc = async (ctx: QueryCtx, ...args: Args) => {
    const currentUser = await getCurrentUser(ctx);
    if (!currentUser) {
      throw new Error('Query requires authentication.');
    }
    return queryFunc(ctx, currentUser, ...args);
  };
  return query(wrappedFunc);
}

export default authenticatedQuery;
