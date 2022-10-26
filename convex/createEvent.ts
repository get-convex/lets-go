import authenticatedMutation from './helpers/authenticatedMutation';

export type CreateEventInput = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  slots: number;
};

export default authenticatedMutation(
  async ({ db }, user, input: CreateEventInput) => {
    const inviteCode = [...Array(7)]
      .map(() => Math.random().toString(36)[2])
      .join('');

    db.insert('events', {
      ...input,
      host: user._id,
      inviteCode,
    });

    return inviteCode;
  }
);
