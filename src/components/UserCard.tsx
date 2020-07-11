import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import { Subheading, Caption, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { useMe } from "../context/meContext";
import FollowBtn from "../components/FollowBtn";

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
const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  padding-left: 15px;
`;

interface IProps {
  userId?: string;
  userImg?: string;
  name: string;
  username: string;
  isFollowing?: boolean;
  navigation;
}

const UserCard: React.FC<IProps> = ({
  userId,
  userImg = null,
  name,
  username,
  isFollowing,
  navigation,
}) => {
  const { me, loading: meLoading } = useMe();
  const onPress = () => {
    me?.user?.id === userId
      ? navigation.navigate("MyProfileScreen")
      : navigation.navigate("UserProfileScreen", { userId });
  };
  return (
    <OuterUserInfoContainer>
      <Avatar
        rounded
        containerStyle={{ marginTop: 5, marginLeft: 5 }}
        source={{
          uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
        }}
        onPress={onPress}
      />
      <InnerUserInfoContainer>
        <Header>
          <TouchableOpacity onPress={onPress}>
            <Subheading numberOfLines={1}>{name}</Subheading>
            <Caption numberOfLines={1}>{`@${username}`}</Caption>
          </TouchableOpacity>
          {me?.user?.id !== userId && (
            <FollowBtn isFollowing={isFollowing} userId={userId} />
          )}
        </Header>
      </InnerUserInfoContainer>
    </OuterUserInfoContainer>
  );
};

export default withNavigation(UserCard);
