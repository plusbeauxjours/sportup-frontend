import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import FollowBtn from "./FollowBtn";
import { get_or_create_chat } from "../constants/firebase";
import { withNavigation } from "react-navigation";

const View = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface IProps {
  senderUsernameForChat: string;
  senderUserIdForChat: string;
  receiverUserIdForChat: string;
  receiverPushToken: string;
  isFollowing: boolean;
  navigation;
}

const UserInteractionCard: React.FC<IProps> = ({
  senderUserIdForChat,
  senderUsernameForChat,
  receiverPushToken,
  receiverUserIdForChat,
  isFollowing,
  navigation,
}) => {
  const onPress = async () => {
    const new_key_chats = await get_or_create_chat();
    if (new_key_chats) {
      navigation.push("ChatScreen", {
        chatIdForChat: new_key_chats,
        senderUserIdForChat,
        senderUsernameForChat,
        receiverPushToken,
        receiverUserIdForChat,
      });
    }
  };
  return (
    <View>
      <Button icon="message" onPress={() => onPress()}>
        Message
      </Button>
      <FollowBtn isFollowing={isFollowing} userId={receiverUserIdForChat} />
    </View>
  );
};

export default withNavigation(UserInteractionCard);
