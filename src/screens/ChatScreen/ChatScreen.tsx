import React, { useState } from "react";
import { View } from "react-native";
import { GiftedChat, Send, Bubble, Actions } from "react-native-gifted-chat";
import { Icon } from "react-native-elements";
import { Appbar } from "react-native-paper";
import CustomView from "./CustomView";
import { PRIMARY_COLOR } from "../../constants/colors";
import styled from "styled-components/native";

const Name = styled.Text`
  margin-left: 10px;
  font-weight: bold;
`;
const Row = styled.View`
  flex-direction: row;
`;

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState<any>([
    {
      _id: 1,
      text: navigation.getParam("lastMessage"),
      createdAt: new Date(navigation.getParam("time")),
      user: {
        _id: 2,
        name: "Chuck Norris",
      },
    },
  ]);

  const onSend = (message) => {
    setMessages((prevState) => ({
      messages: GiftedChat.append(prevState.messages, message),
    }));
  };

  const renderActionsIcon = () => <Icon name="add-circle" color="lightgray" />;

  const renderActions = (props) => {
    const options = {
      "Send location": () => {
        props.navigation.navigate("Location", { onSend: props.onSend });
      },
      Cancel: () => {},
    };

    return <Actions {...props} icon={renderActionsIcon} options={options} />;
  };

  const renderCustomView = (props) => {
    return <CustomView {...props} />;
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{ justifyContent: "center", marginHorizontal: 10 }}
      >
        <View style={{ alignSelf: "center" }}>
          <Icon name="send" color={PRIMARY_COLOR} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <View>
        <Name>{props.currentMessage.user.name}</Name>
        <Bubble
          {...props}
          wrapperStyle={{ right: { backgroundColor: PRIMARY_COLOR } }}
        />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      user={{ _id: 1 }}
      onSend={onSend}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderActions={renderActions}
      renderCustomView={renderCustomView}
    />
  );
};
ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("chatName"),
  headerRight: (
    <Row>
      <Appbar.Action
        icon="info"
        onPress={() =>
          navigation.navigate("ChatInfoScreen", {
            chatName: navigation.getParam("chatName"),
          })
        }
      />
      <Appbar.Action icon="delete" onPress={() => {}} />
    </Row>
  ),
});

export default ChatScreen;
