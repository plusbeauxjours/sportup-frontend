import React from "react";
import { withNavigation } from "react-navigation";
import { Avatar } from "react-native-elements";
import styled from "styled-components/native";
import { Caption, Subheading, Paragraph } from "react-native-paper";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { timeSince } from "../utils/time";

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding: 10px;
`;

const RightContainer = styled.View`
  flex: 1;
  padding-left: 8px;
`;

const UpperHalfContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

const ChatCard = ({
  id,
  unread = false,
  avatar = "",
  name,
  time,
  lastMessage,
  navigation,
}) => {
  const gotoChat = () => {
    navigation.push("ChatScreen", {
      chatId: id,
      chatName: name,
      lastMessage,
      time,
    });
  };
  return (
    <TouchableOpacity onPress={gotoChat}>
      <Avatar
        rounded
        containerStyle={{ marginTop: 5, marginLeft: 5 }}
        source={{
          uri: avatar ? MEDIA_URL + avatar : NO_AVATAR_THUMBNAIL,
        }}
      />
      <RightContainer>
        {unread ? (
          <>
            <UpperHalfContainer>
              <Subheading
                numberOfLines={1}
                style={{ color: "#000", fontWeight: "bold" }}
              >
                {name}
              </Subheading>
              <Caption style={{ color: "#000", fontWeight: "bold" }}>
                {timeSince(time)}
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
              <Subheading numberOfLines={1}>{name}</Subheading>
              <Caption>{timeSince(time)}</Caption>
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

export default withNavigation(ChatCard);
