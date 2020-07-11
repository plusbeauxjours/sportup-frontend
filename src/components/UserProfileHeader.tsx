import React from "react";
import { Paragraph, Caption, Headline } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../constants/urls";
import styled from "styled-components/native";
import UserConnectionsCard from "./UserConnectionsCard";
import UserInteractionCard from "./UserInteractionCard";
import SportsList from "./SportsList";
import RatingDialog from "./RatingDialog";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 5px 0;
  background-color: #fff;
`;

interface IProps {
  id: string;
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
  sports: any;
  connections?: any;
  onTeamsPress: (id: string) => void;
  onFollowersPress: (id: string) => void;
  onFollowingPress: (id: string) => void;
  showDialog: (sportId: string) => void;
  isFollowing: boolean;
  dialogVisible: boolean;
  rating: number;
  closeDialog: () => void;
  onStarRatingPress: (rating: number) => void;
  onSubmit: () => void;
}

const UserProfileHeader: React.FC<IProps> = ({
  id,
  userImg = null,
  name,
  username,
  bio = "",
  sports,
  connections = { team: 0, followers: 0, following: 0 },
  onTeamsPress = null,
  onFollowersPress = null,
  onFollowingPress = null,
  showDialog,
  isFollowing = false,
  dialogVisible,
  rating,
  closeDialog,
  onStarRatingPress,
  onSubmit,
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
      <UserInteractionCard id={id} isFollowing={isFollowing} />
      <SportsList sports={sports} onChipPress={showDialog} />
      <UserConnectionsCard
        {...connections}
        onTeamsPress={onTeamsPress}
        onFollowersPress={onFollowersPress}
        onFollowingPress={onFollowingPress}
      />
      <RatingDialog
        visible={dialogVisible}
        rating={rating}
        onStarRatingPress={onStarRatingPress}
        close={closeDialog}
        onSubmit={onSubmit}
      />
    </UserInfoContainer>
  );
};

export default UserProfileHeader;
