import React from "react";
import styled from "styled-components";
import { Avatar } from "react-native-elements";
import { Card, Subheading, Caption, Paragraph } from "react-native-paper";
import { MEDIA_URL } from "../constants/urls";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  withNavigation
} from "react-navigation";

import { timeSince } from "../utils/time";
import { GetMyFeed_getMyFeed_posts_postedBy } from "../types/api";
import VoteBtn from "./VoteBtn";
import { useMe } from "../context/meContext";

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

interface UserInfoAreaProps {
  uuid?: string;
  name?: string;
  username?: string;
  userImg?: string;
  createdAt: string;
  disableNavigation: boolean;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IProps {
  uuid?: string;
  postedBy?: GetMyFeed_getMyFeed_posts_postedBy;
  score?: number;
  text?: string;
  interaction?: string;
  postImg?: string;
  createdAt?: any;
  disableNavigation: boolean;
}

const UserInfoArea: React.FC<UserInfoAreaProps> = withNavigation(
  ({
    uuid,
    name,
    username,
    userImg,
    createdAt,
    navigation,
    disableNavigation
  }) => {
    const { me, loading: meLoading } = useMe();
    return (
      <OuterUserInfoContainerStyle>
        <TouchableOpacity
          disabled={disableNavigation}
          onPress={() => {
            me.user.uuid === uuid
              ? navigation.navigate("MyProfile")
              : navigation.navigate("UserProfile", { uuid });
          }}
        >
          <Avatar
            rounded
            source={{
              uri: userImg
                ? MEDIA_URL + userImg
                : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media"
            }}
          />
          <InnerUserInfoContainerStyle>
            <Subheading>{name}</Subheading>
            <Caption>{`@${username}`}</Caption>
          </InnerUserInfoContainerStyle>
        </TouchableOpacity>
        <TimeContainer>
          <Caption>{timeSince(createdAt)}</Caption>
        </TimeContainer>
      </OuterUserInfoContainerStyle>
    );
  }
);

const PostCard: React.FC<IProps> = ({
  uuid,
  postedBy,
  score,
  text,
  interaction,
  postImg,
  createdAt,
  disableNavigation
}) => (
  <Card>
    <Card.Content>
      <UserInfoArea
        disableNavigation={disableNavigation}
        createdAt={createdAt}
        {...postedBy}
      />
      {text && <Paragraph>{text}</Paragraph>}
    </Card.Content>
    {!!postImg && <Card.Cover source={{ uri: postImg }} />}
    <Card.Actions>
      <VoteBtn uuid={uuid} interaction={interaction} score={score} />
    </Card.Actions>
  </Card>
);
export default PostCard;
