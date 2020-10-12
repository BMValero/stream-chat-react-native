import React, { PureComponent } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelList,
  ChannelPreviewMessenger,
  Chat,
  MessageInput,
  MessageList,
  Streami18n,
  Thread,
} from 'stream-chat-expo';

import { createAppContainer, createStackNavigator } from 'react-navigation';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9uIn0.eRVjxLvd4aqCEHY_JRa97g6k7WpHEhxL7Z4K4yTot1c';
const user = {
  id: 'ron',
};

const filters = {
  example: 'example-apps',
  members: { $in: ['ron'] },
  type: 'messaging',
};
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};
// Read more about style customizations at - https://getstream.io/chat/react-native-chat/tutorial/#custom-styles
const theme = {
  avatar: {
    image: {
      size: 32,
    },
  },
  colors: {
    primary: 'blue',
  },
  spinner: {
    css: `
      width: 15px;
      height: 15px;
    `,
  },
};

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
  language: 'en',
});

class ChannelListScreen extends PureComponent {
  static navigationOptions = () => ({
    headerTitle: <Text style={{ fontWeight: 'bold' }}>Channel List</Text>,
  });

  render() {
    return (
      <SafeAreaView>
        <Chat client={chatClient} i18nInstance={streami18n} style={theme}>
          <View style={{ display: 'flex', height: '100%', padding: 10 }}>
            <ChannelList
              filters={filters}
              onSelect={(channel) => {
                this.props.navigation.navigate('Channel', {
                  channel,
                });
              }}
              options={options}
              Preview={ChannelPreviewMessenger}
              sort={sort}
            />
          </View>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ChannelScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const channel = navigation.getParam('channel');
    return {
      headerTitle: (
        <Text style={{ fontWeight: 'bold' }}>{channel.data.name}</Text>
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const channel = navigation.getParam('channel');

    return (
      <SafeAreaView>
        <Chat client={chatClient} i18nInstance={streami18n} style={theme}>
          <Channel channel={channel} client={chatClient}>
            <View style={{ display: 'flex', height: '100%' }}>
              <MessageList
                onThreadSelect={(thread) => {
                  this.props.navigation.navigate('Thread', {
                    channel: channel.id,
                    thread,
                  });
                }}
              />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ThreadScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
            borderStyle: 'solid',
            borderWidth: 1,
            height: 30,
            justifyContent: 'center',
            width: 30,
          }}
        >
          <Text>X</Text>
        </View>
      </TouchableOpacity>
    ),
    headerTitle: <Text style={{ fontWeight: 'bold' }}>Thread</Text>,
  });

  render() {
    const { navigation } = this.props;
    const thread = navigation.getParam('thread');
    const channel = chatClient.channel(
      'messaging',
      navigation.getParam('channel'),
    );

    return (
      <SafeAreaView>
        <Chat client={chatClient} i18nInstance={streami18n}>
          <Channel
            channel={channel}
            client={chatClient}
            dummyProp='DUMMY PROP'
            thread={thread}
          >
            <View
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <Thread thread={thread} />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Channel: {
      screen: ChannelScreen,
    },
    ChannelList: {
      screen: ChannelListScreen,
    },
    Thread: {
      screen: ThreadScreen,
    },
  },
  {
    initialRouteName: 'ChannelList',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientReady: false,
    };
  }

  async componentDidMount() {
    await chatClient.setUser(user, userToken);

    this.setState({
      clientReady: true,
    });
  }
  render() {
    if (this.state.clientReady) return <AppContainer />;
    else return null;
  }
}
