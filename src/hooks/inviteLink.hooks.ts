import { message } from 'antd';

export const useInviteLink = () => {
  const getInviteLink = (inviteCode: string) =>
    `${window.location.origin}/invitation/${inviteCode}`;

  const copyInviteLink = (inviteCode: string) => {
    navigator.clipboard.writeText(getInviteLink(inviteCode));
    message.success('Link copied to clipboard');
  };

  return { getInviteLink, copyInviteLink };
};
