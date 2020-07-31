import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { useMe } from "../context/meContext";
import FollowBtn from "../components/FollowBtn";
import PlayerCardBottomSection from "./PlayerCardBottomSection";

const InnerUserInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Border = styled.View`
  border-color: #999;
  border-width: 0.5px;
  border-radius: 20px;
  padding: 10px;
  margin: 3px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const OuterUserInfoContainerStyle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  align-items: center;
  padding: 10px;
`;

const Header = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

const UserCard = ({ user, bottomSection = false, navigation }) => {
  const { me, loading: meLoading } = useMe();
  const onPress = () => {
    me?.user?.id === user.id
      ? navigation.navigate("MyProfileScreen")
      : navigation.navigate("UserProfileScreen", { userId: user.id });
  };
  return (
    <TouchableOpacity key={user.id} onPress={onPress}>
      <Border>
        <OuterUserInfoContainerStyle>
          <Avatar
            rounded
            source={{
              uri: user.userImg
                ? MEDIA_URL + user.userImg
                : NO_AVATAR_THUMBNAIL,
            }}
            onPress={onPress}
          />
          <InnerUserInfoContainer>
            <Header>
              <NameText>{user.name}</NameText>
              <Caption>{`@${user.username}`}</Caption>
            </Header>
            {me?.user?.id !== user.id && (
              <FollowBtn isFollowing={user.isFollowing} userId={user.id} />
            )}
          </InnerUserInfoContainer>
        </OuterUserInfoContainerStyle>
        {bottomSection && (
          <PlayerCardBottomSection
            id={user.id}
            sports={user.sports}
            teams={user.teams}
          />
        )}
      </Border>
    </TouchableOpacity>
  );
};

export default withNavigation(UserCard);
