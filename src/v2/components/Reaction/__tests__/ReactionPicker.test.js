import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ReactionPicker } from '../ReactionPicker';

import { Chat } from '../../Chat/Chat';

import { emojiData } from '../../../utils/utils';

import { generateUser } from '../../../../mock-builders/generator/user';
import { getTestClientWithUser } from '../../../../mock-builders/mock';

const defaultProps = {
  latestReactions: [
    {
      created_at: '2019-11-28T11:14:20.155817Z',
      message_id: 'billowing-firefly-8-52540509-ed51-476e-8b6b-e8929aba9e33',
      score: 1,
      type: 'sad',
      updated_at: '2019-11-28T11:14:20.155817Z',
      user: {
        banned: false,
        created_at: '2019-08-26T10:49:19.667963Z',
        id: 'bender',
        image: 'https://bit.ly/321RmWb',
        last_active: '2020-01-06T08:42:44.097139Z',
        name: 'Bender',
        online: false,
        role: 'user',
        updated_at: '2020-01-06T08:42:44.106042Z',
      },
      user_id: 'bender',
    },
    {
      created_at: '2019-11-28T11:13:54.845187Z',
      message_id: 'billowing-firefly-8-52540509-ed51-476e-8b6b-e8929aba9e33',
      score: 1,
      type: 'haha',
      updated_at: '2019-11-28T11:13:54.845187Z',
      user: {
        banned: false,
        created_at: '2019-08-26T10:49:19.667963Z',
        id: 'bender',
        image: 'https://bit.ly/321RmWb',
        last_active: '2020-01-06T08:42:44.097139Z',
        name: 'Bender',
        online: false,
        role: 'user',
        updated_at: '2020-01-06T08:42:44.106042Z',
      },
      user_id: 'bender',
    },
    {
      created_at: '2019-11-28T10:32:58.981307Z',
      message_id: 'billowing-firefly-8-52540509-ed51-476e-8b6b-e8929aba9e33',
      score: 1,
      type: 'like',
      updated_at: '2019-11-28T10:32:58.981307Z',
      user: {
        banned: false,
        created_at: '2019-08-26T10:49:19.667963Z',
        id: 'bender',
        image: 'https://bit.ly/321RmWb',
        last_active: '2020-01-06T08:42:44.097139Z',
        name: 'Bender',
        online: false,
        role: 'user',
        updated_at: '2020-01-06T08:42:44.106042Z',
      },
      user_id: 'bender',
    },
    {
      created_at: '2019-11-26T22:32:21.975407Z',
      message_id: 'billowing-firefly-8-52540509-ed51-476e-8b6b-e8929aba9e33',
      score: 1,
      type: 'sad',
      updated_at: '2019-11-26T22:32:21.975407Z',
      user: {
        banned: false,
        created_at: '2019-04-02T13:26:55.274436Z',
        id: 'billowing-firefly-8',
        image:
          'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
        last_active: '2020-01-06T16:47:25.692477Z',
        name: 'Billowing firefly',
        online: true,
        role: 'user',
        updated_at: '2020-01-06T16:47:25.696327Z',
      },
      user_id: 'billowing-firefly-8',
    },
    {
      created_at: '2019-11-26T22:31:51.31847Z',
      message_id: 'billowing-firefly-8-52540509-ed51-476e-8b6b-e8929aba9e33',
      score: 1,
      type: 'like',
      updated_at: '2019-11-26T22:31:51.31847Z',
      user: {
        banned: false,
        created_at: '2019-04-02T13:26:55.274436Z',
        id: 'billowing-firefly-8',
        image:
          'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
        last_active: '2020-01-06T16:47:25.692477Z',
        name: 'Billowing firefly',
        online: true,
        role: 'user',
        updated_at: '2020-01-06T16:47:25.696327Z',
      },
      user_id: 'billowing-firefly-8',
    },
  ],
  reactionCounts: {
    haha: 1,
    like: 2,
    sad: 2,
  },
  reactionPickerVisible: true,
};

describe('ReactionPicker', () => {
  const clientUser = generateUser();
  let chatClient;

  const getComponent = (props = {}) => (
    <Chat client={chatClient}>
      <ReactionPicker {...props} />
    </Chat>
  );

  beforeEach(async () => {
    chatClient = await getTestClientWithUser(clientUser);
  });

  it('should render ReactionPicker', async () => {
    const props = { ...defaultProps, handleReaction: jest.fn() };
    const { getByTestId, queryByTestId, toJSON } = render(getComponent(props));

    await waitFor(() => {
      expect(queryByTestId('reaction-picker')).toBeTruthy();
      emojiData.forEach((emoji) => {
        expect(queryByTestId(`${emoji.id}-reaction`)).toBeTruthy();
        expect(
          queryByTestId(
            `${emoji.id}-${defaultProps.reactionCounts[emoji.id] || 'count'}`,
          ),
        ).toBeTruthy();
        expect(
          getByTestId(
            `${emoji.id}-${defaultProps.reactionCounts[emoji.id] || 'count'}`,
          ),
        ).toHaveTextContent(defaultProps.reactionCounts[emoji.id] || '');
      });
      expect(props.handleReaction).toHaveBeenCalledTimes(0);
    });

    emojiData.forEach((emoji) => {
      fireEvent.press(getByTestId(`${emoji.id}-reaction`));
    });

    await waitFor(() => {
      expect(props.handleReaction).toHaveBeenCalledTimes(emojiData.length);
    });

    const snapshot = toJSON();

    await waitFor(() => {
      expect(snapshot).toMatchSnapshot();
    });
  });

  it('should render not visible ReactionPicker', async () => {
    const { queryByTestId, toJSON } = render(
      getComponent({ ...defaultProps, reactionPickerVisible: false }),
    );

    await waitFor(() => {
      expect(queryByTestId('reaction-picker')).toBeFalsy();
      emojiData.forEach((emoji) => {
        expect(queryByTestId(`${emoji.id}-reaction`)).toBeFalsy();
        expect(
          queryByTestId(
            `${emoji.id}-${defaultProps.reactionCounts[emoji.id] || 'count'}`,
          ),
        ).toBeFalsy();
      });
    });

    const snapshot = toJSON();

    await waitFor(() => {
      expect(snapshot).toMatchSnapshot();
    });
  });
});
