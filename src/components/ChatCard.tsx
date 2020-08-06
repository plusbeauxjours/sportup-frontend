import React from "react";
import { Avatar } from "react-native-elements";
import styled from "styled-components/native";
import { Paragraph } from "react-native-paper";

import { NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { timeSince } from "../utils/time";
import { useNavigation } from "@react-navigation/native";

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding: 10px;
`;

const RightContainer = styled.View`
  flex: 1;
  padding-left: 8px;
`;

const Caption = styled.Text`
  width: 50px;
  font-size: 10px;
  color: #999;
`;

const UpperHalfContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

interface IProps {
  status: any;
  createdAt: string;
  lastMessage: string;
  chatId: string;
  senderUsername: string;
  senderUserId: string;
  senderPushToken: string;
  receiverUsername: string;
  receiverUserId: string;
  receiverPushToken: string;
  navigation;
}

const ChatCard: React.FC<IProps> = ({
  status,
  createdAt,
  lastMessage,
  chatId,
  senderUsername,
  senderUserId,
  senderPushToken,
  receiverUsername,
  receiverUserId,
  receiverPushToken,
  navigation,
}) => {
  const gotoChat = () => {
    const navigation = useNavigation();
    navigation.navigate("ChatScreen", {
      chatId,
      senderUsername,
      senderUserId,
      senderPushToken,
      receiverUsername,
      receiverUserId,
      receiverPushToken,
    });
  };
  return (
    <TouchableOpacity onPress={gotoChat}>
      <Avatar
        rounded
        containerStyle={{ marginTop: 5, marginLeft: 5 }}
        source={{ uri: NO_AVATAR_THUMBNAIL }}
      />
      <RightContainer>
        {status === "false" ? (
          <>
            <UpperHalfContainer>
              <NameText
                numberOfLines={1}
                style={{ color: "#000", fontWeight: "bold" }}
              >
                @{senderUsername}
              </NameText>
              <Caption style={{ color: "#000", fontWeight: "bold" }}>
                {timeSince(createdAt)}
              </Caption>
            </UpperHalfContainer>
            <Paragraph
              numberOfLines={1}
              style={{ color: "#000", fontWeight: "bold" }}
            >
              {lastMessage}
            </Paragraph>
          </>
        ) : (
          <>
            <UpperHalfContainer>
              <NameText numberOfLines={1}>@{senderUsername}</NameText>
              <Caption>{timeSince(createdAt)}</Caption>
            </UpperHalfContainer>
            <Paragraph numberOfLines={1} style={{ color: "darkgray" }}>
              {lastMessage}
            </Paragraph>
          </>
        )}
      </RightContainer>
    </TouchableOpacity>
  );
};

export default ChatCard;
