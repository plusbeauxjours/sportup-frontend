import React from "react";
import { Paragraph, Caption, Headline } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL } from "../constants/urls";
import styled from "styled-components";
import UserConnectionsCard from "./UserConnectionsCard";
import UserInteractionCard from "./UserInteractionCard";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 5px 0;
  background-color: #fff;
`;

interface IProps {
  uuid: string;
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
  sports: any;
  connections?: any;
  onTeamsPress: (uuid: string) => void;
  onFollowersPress: (uuid: string) => void;
  onFollowingPress: (uuid: string) => void;
  isFollowing: boolean;
}

const UserProfileHeader: React.FC<IProps> = ({
  uuid,
  userImg = null,
  name,
  username,
  bio = "",
  connections = { team: 0, followers: 0, following: 0 },
  onTeamsPress = null,
  onFollowersPress = null,
  onFollowingPress = null,
  isFollowing = false
}) => {
  return (
    <UserInfoContainer>
      <Avatar
        size="large"
        rounded
        containerStyle={{ marginVertical: 5 }}
        source={{
          uri: userImg
            ? MEDIA_URL + userImg
            : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media"
        }}
      />
      <Headline>{name}</Headline>
      <Caption>{`@${username}`}</Caption>
      <Paragraph>{bio}</Paragraph>
      <UserInteractionCard uuid={uuid} isFollowing={isFollowing} />
      <UserConnectionsCard
        {...connections}
        onTeamsPress={onTeamsPress}
        onFollowersPress={onFollowersPress}
        onFollowingPress={onFollowingPress}
      />
    </UserInfoContainer>
  );
};

export default UserProfileHeader;
