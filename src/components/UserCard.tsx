import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { useMe } from "../context/meContext";
import FollowBtn from "../components/FollowBtn";

const InnerUserInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px 0;
  padding: 0 5px 0 5px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
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
    <TouchableOpacity onPress={onPress}>
      <Avatar
        rounded
        source={{
          uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
        }}
        onPress={onPress}
      />
      <InnerUserInfoContainer>
        <Header>
          <NameText>{name}</NameText>
          <Caption>{`@${username}`}</Caption>
        </Header>
        {me?.user?.id !== userId && (
          <FollowBtn isFollowing={isFollowing} userId={userId} />
        )}
      </InnerUserInfoContainer>
    </TouchableOpacity>
  );
};

export default withNavigation(UserCard);
