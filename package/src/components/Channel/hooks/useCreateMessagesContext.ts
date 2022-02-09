import { useMemo } from 'react';

import type { MessagesContextValue } from '../../../contexts/messagesContext/MessagesContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';

export const useCreateMessagesContext = <
  StreamChatClient extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>({
  additionalTouchableProps,
  Attachment,
  AttachmentActions,
  Card,
  CardCover,
  CardFooter,
  CardHeader,
  channelId,
  DateHeader,
  deletedMessagesVisibilityType,
  disableTypingIndicator,
  dismissKeyboardOnMessageTouch,
  enableMessageGroupingByUser,
  FileAttachment,
  FileAttachmentGroup,
  FileAttachmentIcon,
  FlatList,
  forceAlignMessages,
  formatDate,
  Gallery,
  Giphy,
  handleBlock,
  handleCopy,
  handleDelete,
  handleEdit,
  handleFlag,
  handleMute,
  handlePinMessage,
  handleQuotedReply,
  handleReaction,
  handleRetry,
  handleThreadReply,
  initialScrollToFirstUnreadMessage,
  InlineDateSeparator,
  InlineUnreadIndicator,
  legacyImageViewerSwipeBehaviour,
  markdownRules,
  Message,
  messageActions,
  MessageAvatar,
  MessageContent,
  messageContentOrder,
  MessageDeleted,
  MessageFooter,
  MessageHeader,
  MessageList,
  MessagePinnedHeader,
  MessageReplies,
  MessageRepliesAvatars,
  MessageSimple,
  MessageStatus,
  MessageSystem,
  MessageText,
  myMessageTheme,
  onLongPressMessage,
  onPressInMessage,
  onPressMessage,
  OverlayReactionList,
  ReactionList,
  removeMessage,
  Reply,
  retrySendMessage,
  ScrollToBottomButton,
  selectReaction,
  setEditingState,
  setQuotedMessageState,
  supportedReactions,
  targetedMessage,
  TypingIndicator,
  TypingIndicatorContainer,
  updateMessage,
  UrlPreview,
}: MessagesContextValue<StreamChatClient> & {
  /**
   * To ensure we allow re-render, when channel is changed
   */
  channelId?: string;
}) => {
  const additionalTouchablePropsLength = Object.keys(additionalTouchableProps || {}).length;
  const markdownRulesLength = Object.keys(markdownRules || {}).length;
  const messageContentOrderValue = messageContentOrder.join();
  const supportedReactionsLength = supportedReactions.length;

  const messagesContext: MessagesContextValue<StreamChatClient> = useMemo(
    () => ({
      additionalTouchableProps,
      Attachment,
      AttachmentActions,
      Card,
      CardCover,
      CardFooter,
      CardHeader,
      DateHeader,
      deletedMessagesVisibilityType,
      disableTypingIndicator,
      dismissKeyboardOnMessageTouch,
      enableMessageGroupingByUser,
      FileAttachment,
      FileAttachmentGroup,
      FileAttachmentIcon,
      FlatList,
      forceAlignMessages,
      formatDate,
      Gallery,
      Giphy,
      handleBlock,
      handleCopy,
      handleDelete,
      handleEdit,
      handleFlag,
      handleMute,
      handlePinMessage,
      handleQuotedReply,
      handleReaction,
      handleRetry,
      handleThreadReply,
      initialScrollToFirstUnreadMessage,
      InlineDateSeparator,
      InlineUnreadIndicator,
      legacyImageViewerSwipeBehaviour,
      markdownRules,
      Message,
      messageActions,
      MessageAvatar,
      MessageContent,
      messageContentOrder,
      MessageDeleted,
      MessageFooter,
      MessageHeader,
      MessageList,
      MessagePinnedHeader,
      MessageReplies,
      MessageRepliesAvatars,
      MessageSimple,
      MessageStatus,
      MessageSystem,
      MessageText,
      myMessageTheme,
      onLongPressMessage,
      onPressInMessage,
      onPressMessage,
      OverlayReactionList,
      ReactionList,
      removeMessage,
      Reply,
      retrySendMessage,
      ScrollToBottomButton,
      selectReaction,
      setEditingState,
      setQuotedMessageState,
      supportedReactions,
      targetedMessage,
      TypingIndicator,
      TypingIndicatorContainer,
      updateMessage,
      UrlPreview,
    }),
    [
      additionalTouchablePropsLength,
      channelId,
      disableTypingIndicator,
      dismissKeyboardOnMessageTouch,
      initialScrollToFirstUnreadMessage,
      markdownRulesLength,
      messageContentOrderValue,
      supportedReactionsLength,
      targetedMessage,
    ],
  );

  return messagesContext;
};
