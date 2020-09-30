import React from 'react';
import { Modal, View } from 'react-native';

import Avatar from '../Avatar/Avatar';
import { styled } from '../../styles/styledComponents';
import { themed } from '../../styles/theme';
import { emojiData } from '../../utils/utils';

import type { LatestReactions, Reaction } from './ReactionList';

import type { MessageWithDates } from '../../contexts/messagesContext/MessagesContext';
import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../types/types';

const Container = styled.TouchableOpacity<{ leftAlign: boolean }>`
  align-items: ${({ leftAlign }) => (leftAlign ? 'flex-start' : 'flex-end')};
  flex: 1;
  ${({ theme }) => theme.message.reactionPicker.container.css}
`;

const ContainerView = styled.View`
  background-color: black;
  border-radius: 30px;
  flex-direction: row;
  height: 60px;
  padding-horizontal: 20px;
  ${({ theme }) => theme.message.reactionPicker.containerView.css}
`;

const Column = styled.View`
  align-items: center;
  margin-top: -5px;
  ${({ theme }) => theme.message.reactionPicker.column.css}
`;

const Emoji = styled.Text`
  font-size: 20px;
  margin-vertical: 5px;
  ${({ theme }) => theme.message.reactionPicker.emoji.css}
`;

const ReactionCount = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
  ${({ theme }) => theme.message.reactionPicker.text.css}
`;

const getLatestUser = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  type: string,
  reactions?: LatestReactions<At, Ch, Co, Me, Re, Us>,
) => {
  const filtered = getUsersPerReaction(type, reactions);
  if (filtered?.[0]?.user) {
    return filtered[0].user;
  } else {
    return 'NotFound';
  }
};

const getUsersPerReaction = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  type: string,
  reactions?: LatestReactions<At, Ch, Co, Me, Re, Us>,
) => {
  const filtered = reactions?.filter((item) => item.type === type);
  return filtered;
};

export type ReactionPickerProps<
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
> = {
  handleDismiss: () => void;
  handleReaction: (arg: string) => void;
  hideReactionCount: boolean;
  hideReactionOwners: boolean;
  latestReactions?: LatestReactions<At, Ch, Co, Me, Re, Us>;
  reactionCounts?:
    | MessageWithDates<At, Ch, Co, Me, Re, Us>['reaction_counts']
    | null;
  reactionPickerVisible?: boolean;
  rpLeft?: number;
  rpRight?: number;
  rpTop?: number;
  supportedReactions?: Reaction[];
};

// TODO: change from using Modal to reanimated view to save on rendering and performance
const ReactionPicker = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends DefaultUserType = DefaultUserType
>({
  handleDismiss,
  handleReaction,
  hideReactionCount = false,
  hideReactionOwners = false,
  latestReactions,
  reactionCounts,
  reactionPickerVisible,
  rpLeft = 30,
  rpRight = 10,
  rpTop = 40,
  supportedReactions = emojiData,
}: ReactionPickerProps<At, Ch, Co, Me, Re, Us>) =>
  reactionPickerVisible ? (
    <Modal
      animationType='fade'
      onRequestClose={handleDismiss}
      testID='reaction-picker'
      transparent
      visible={reactionPickerVisible}
    >
      <Container
        activeOpacity={1}
        leftAlign={Boolean(rpLeft)}
        onPress={handleDismiss}
      >
        <ContainerView
          style={{
            marginLeft: rpLeft ?? undefined,
            marginRight: rpRight ?? undefined,
            marginTop: rpTop,
          }}
        >
          {supportedReactions.map(({ icon, id }) => {
            const latestUser = getLatestUser<At, Ch, Co, Me, Re, Us>(
              id,
              latestReactions,
            );
            const count = reactionCounts?.[id] || 0;
            return (
              <Column key={id} testID={id}>
                {latestUser !== 'NotFound' && !hideReactionOwners ? (
                  <Avatar
                    image={latestUser.image}
                    name={latestUser.name || latestUser.id}
                    size={18}
                  />
                ) : (
                  !hideReactionOwners && (
                    <View style={{ height: 18, width: 18 }} />
                  )
                )}
                <Emoji
                  onPress={() => handleReaction(id)}
                  testID={`${id}-reaction`}
                >
                  {icon}
                </Emoji>
                {!hideReactionCount && (
                  <ReactionCount testID={`${id}-${count || 'count'}`}>
                    {count > 0 ? count : ''}
                  </ReactionCount>
                )}
              </Column>
            );
          })}
        </ContainerView>
      </Container>
    </Modal>
  ) : null;

ReactionPicker.themePath = 'message.reactionPicker';

export default themed(ReactionPicker) as typeof ReactionPicker;
