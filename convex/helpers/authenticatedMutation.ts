import { PublicMutation } from 'convex/server';
import { DataModel, Document } from '../_generated/dataModel';
import { mutation, MutationCtx } from '../_generated/server';
import getCurrentUser from './getCurrentUser';

function authenticatedMutation<Args extends any[], ReturnType>(
  mutationFunc: (
    ctx: MutationCtx,
    user: Document<'users'>,
    ...args: Args
  ) => Promise<ReturnType>
): PublicMutation<DataModel, Args, Promise<ReturnType>> {
  const wrappedFunc = async (ctx: MutationCtx, ...args: Args) => {
    const currentUser = await getCurrentUser(ctx);
    if (!currentUser) {
      throw new Error('Mutation requires authentication.');
    }
    return mutationFunc(ctx, currentUser, ...args);
  };
  return mutation(wrappedFunc);
}

export default authenticatedMutation;
