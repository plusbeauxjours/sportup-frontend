import React from "react";
import { Paragraph, Caption, Headline } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import styled from "styled-components/native";
import UserConnectionsCard from "./UserConnectionsCard";
import SportsList from "./SportsList";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 1px 0;
  background-color: #fff;
`;

interface IProps {
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
  sports: any;
  connections?: any;
  onTeamsPress: (id: string) => void;
  onFollowersPress: (id: string) => void;
  onFollowingPress: (id: string) => void;
}

const MyProfileHeader: React.FC<IProps> = ({
  userImg = null,
  name,
  username,
  bio = "",
  sports,
  connections = { team: 0, followers: 0, following: 0 },
  onTeamsPress = null,
  onFollowersPress = null,
  onFollowingPress = null,
}) => {
  return (
    <UserInfoContainer>
      <Avatar
        size="large"
        rounded
        containerStyle={{ marginTop: 40 }}
        source={{
          uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
        }}
      />
      <Headline>{name}</Headline>
      <Caption>{`@${username}`}</Caption>
      <Paragraph>{bio}</Paragraph>
      <SportsList sports={sports} />
      <UserConnectionsCard
        {...connections}
        onTeamsPress={onTeamsPress}
        onFollowersPress={onFollowersPress}
        onFollowingPress={onFollowingPress}
      />
    </UserInfoContainer>
  );
};

export default MyProfileHeader;
