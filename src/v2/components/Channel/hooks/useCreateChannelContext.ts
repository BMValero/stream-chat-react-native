import { useMemo } from 'react';

import type { ChannelContextValue } from '../../../contexts/channelContext/ChannelContext';
import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../types/types';

export const useCreateChannelContext = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>({
  channel,
  disabled,
  EmptyStateIndicator,
  error,
  eventHistory,
  giphyEnabled,
  isAdmin,
  isModerator,
  isOwner,
  lastRead,
  loading,
  LoadingIndicator,
  markRead,
  members,
  read,
  setLastRead,
  StickyHeader,
  typing,
  watcherCount,
  watchers,
}: ChannelContextValue<At, Ch, Co, Ev, Me, Re, Us>) => {
  const channelId = channel?.id;
  const lastReadTime = lastRead?.getTime();
  const membersLength = Object.keys(members).length;

  const readUsers = Object.values(read);
  const readUsersLength = readUsers.length;
  const readUsersLastReads = readUsers
    .map(({ last_read }) => last_read.toISOString())
    .join();

  const channelContext: ChannelContextValue<
    At,
    Ch,
    Co,
    Ev,
    Me,
    Re,
    Us
  > = useMemo(
    () => ({
      channel,
      disabled,
      EmptyStateIndicator,
      error,
      eventHistory,
      giphyEnabled,
      isAdmin,
      isModerator,
      isOwner,
      lastRead,
      loading,
      LoadingIndicator,
      markRead,
      members,
      read,
      setLastRead,
      StickyHeader,
      typing,
      watcherCount,
      watchers,
    }),
    [
      channelId,
      disabled,
      error,
      lastReadTime,
      loading,
      membersLength,
      readUsersLength,
      readUsersLastReads,
      typing,
      watcherCount,
    ],
  );

  return channelContext;
};
