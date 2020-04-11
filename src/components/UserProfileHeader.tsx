import React from "react";
import { Paragraph, Caption, Headline } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL } from "../constants/urls";
import styled from "styled-components";
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
  showDialog: (sportUuid: string) => void;
  isFollowing: boolean;
  dialogVisible: boolean;
  rating: number;
  closeDialog: () => void;
  onStarRatingPress: (rating: number) => void;
  onSubmitRating: () => void;
}

const UserProfileHeader: React.FC<IProps> = ({
  uuid,
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
  onSubmitRating,
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
            : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media",
        }}
      />
      <Headline>{name}</Headline>
      <Caption>{`@${username}`}</Caption>
      <Paragraph>{bio}</Paragraph>
      <UserInteractionCard uuid={uuid} isFollowing={isFollowing} />
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
        onSubmit={onSubmitRating}
      />
    </UserInfoContainer>
  );
};

export default UserProfileHeader;
