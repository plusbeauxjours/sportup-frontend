import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import FollowBtn from "./FollowBtn";
import { get_or_create_chat } from "../constants/firebase";
import Button from "./Button";

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
    const navigation = useNavigation();
    const new_key_chats = await get_or_create_chat();
    if (new_key_chats) {
      navigation.navigate("ChatScreen", {
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
      <Button icon="message" onPress={() => onPress()} text={"Message"} />
      <FollowBtn isFollowing={isFollowing} userId={receiverUserId} />
    </View>
  );
};

export default UserInteractionCard;
