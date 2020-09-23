import type { LiteralStringForUnion, UnknownType } from 'stream-chat';

export type DefaultAttachmentType = UnknownType & {
  file_size?: string;
  mime_type?: string;
};

export type DefaultChannelType = UnknownType & {
  image?: string;
};

export type DefaultCommandType = LiteralStringForUnion;

export type DefaultEventType = UnknownType;

export type DefaultMessageType = UnknownType;

export type DefaultReactionType = UnknownType;

export type DefaultUserType = UnknownType & {
  image?: string;
};
