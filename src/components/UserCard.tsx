import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  withNavigation,
} from "react-navigation";
import styled from "styled-components";
import { Subheading, Caption, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { useMe } from "../context/meContext";
import FollowBtn from "../components/FollowBtn";

const View = styled.View``;
const OuterUserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px 0;
  padding: 0 5px 0 5px;
`;
const InnerUserInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TouchableOpacity = styled.View`
  flex: 1;
  padding-left: 15px;
`;

interface IProps {
  uuid: string;
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
  isFollowing?: boolean;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const UserCard: React.FC<IProps> = withNavigation(
  ({
    uuid,
    userImg = null,
    name,
    username,
    bio = "",
    isFollowing,
    navigation,
  }) => {
    const { me, loading: meLoading } = useMe();
    return (
      <OuterUserInfoContainer>
        <Avatar
          rounded
          containerStyle={{ marginTop: 5, marginLeft: 5 }}
          source={{
            uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
          }}
          onPress={() => {
            me.user.uuid === uuid
              ? navigation.navigate("MyProfileScreen")
              : navigation.navigate("UserProfileScreen", { uuid });
          }}
        />
        <InnerUserInfoContainer>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.push("MyProfileScreen")}
            >
              <Subheading numberOfLines={1}>{name}</Subheading>
              <Caption numberOfLines={1}>{`@${username}`}</Caption>
            </TouchableOpacity>
            {me.user.uuid !== uuid && (
              <FollowBtn isFollowing={isFollowing} uuid={uuid} />
            )}
          </Header>
          <Paragraph numberOfLines={2} style={{ padding: 5 }}>
            {bio}
          </Paragraph>
        </InnerUserInfoContainer>
      </OuterUserInfoContainer>
    );
  }
);

export default UserCard;
