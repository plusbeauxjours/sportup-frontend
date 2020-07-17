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
  senderUserId: string;
  senderUsername: string;
  senderPushToken: string;
  receiverUserId: string;
  receiverUsername: string;
  receiverPushToken: string;
  isFollowing: boolean;
  navigation;
}

const UserInteractionCard: React.FC<IProps> = ({
  senderUserId,
  senderUsername,
  senderPushToken,
  receiverUserId,
  receiverUsername,
  receiverPushToken,
  isFollowing,
  navigation,
}) => {
  const onPress = async () => {
    const new_key_chats = await get_or_create_chat();
    if (new_key_chats) {
      navigation.push("ChatScreen", {
        chatId: new_key_chats,
        senderUserId,
        senderUsername,
        senderPushToken,
        receiverUserId,
        receiverUsername,
        receiverPushToken,
      });
    }
  };
  return (
    <View>
      <Button icon="message" onPress={() => onPress()}>
        Message
      </Button>
      <FollowBtn isFollowing={isFollowing} userId={receiverUserId} />
    </View>
  );
};

export default withNavigation(UserInteractionCard);
