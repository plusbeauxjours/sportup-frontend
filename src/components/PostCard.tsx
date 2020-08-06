import React from "react";
import styled from "styled-components/native";
import { Avatar } from "react-native-elements";
import { Card, Paragraph } from "react-native-paper";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";

import { timeSince } from "../utils/time";
import { GetMyFeed_getMyFeed_posts_postedBy } from "../types/api";
import VoteBtn from "./VoteBtn/VoteBtn";
import { useMe } from "../context/meContext";
import { useNavigation } from "@react-navigation/native";

const OuterUserInfoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
`;

const InnerUserInfoContainerStyle = styled.View`
  justify-content: center;
  padding: 0 10px 0 10px;
`;

const TimeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Border = styled.View`
  border-color: #999;
  border-width: 0.5px;
  border-radius: 20px;
  padding: 10px 0;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

interface UserInfoAreaProps {
  id?: string;
  name?: string;
  username?: string;
  userImg?: string;
  createdAt: string;
  disableNavigation: boolean;
}

interface IProps {
  id?: string;
  postedBy?: GetMyFeed_getMyFeed_posts_postedBy;
  score?: number;
  text?: string;
  interaction?: string;
  createdAt?: string;
  disableNavigation: boolean;
}

const UserInfoArea: React.FC<UserInfoAreaProps> = ({
  id,
  name,
  username,
  userImg,
  createdAt,
  disableNavigation,
}) => {
  const navigation = useNavigation();
  const { me, loading: meLoading } = useMe();
  return (
    <OuterUserInfoContainerStyle>
      <TouchableOpacity
        disabled={disableNavigation}
        onPress={() => {
          me?.user.id === id
            ? navigation.navigate("MyProfileScreen")
            : navigation.navigate("UserProfileScreen", { userId: id });
        }}
      >
        <Avatar
          rounded
          source={{
            uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
          }}
        />
        <InnerUserInfoContainerStyle>
          <NameText>{name}</NameText>
          <Caption>{`@${username}`}</Caption>
        </InnerUserInfoContainerStyle>
      </TouchableOpacity>
      <TimeContainer>
        <Caption>{timeSince(createdAt)}</Caption>
      </TimeContainer>
    </OuterUserInfoContainerStyle>
  );
};

const PostCard: React.FC<IProps> = ({
  id,
  postedBy,
  score,
  text,
  interaction,
  createdAt,
  disableNavigation,
}) => (
  <Card style={{ padding: 3 }}>
    <Border>
      <Card.Content>
        <UserInfoArea
          disableNavigation={disableNavigation}
          createdAt={createdAt}
          {...postedBy}
        />
        {text && <Paragraph>{text}</Paragraph>}
      </Card.Content>
      <Card.Actions>
        <VoteBtn postId={id} interaction={interaction} score={score} />
      </Card.Actions>
    </Border>
  </Card>
);
export default PostCard;
