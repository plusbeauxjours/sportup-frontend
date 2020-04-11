import React, { useState } from "react";
import styled from "styled-components";
import { MEDIA_URL } from "../../constants/urls";
import { Headline, Divider, Button } from "react-native-paper";
import RatingChip from "../../components/RatingChip";
import {
  GetTeam_getTeam_team_sport,
  GetTeam,
  GetTeamVariables,
} from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_TEAM } from "./TeamProfileScreenQueries";
import { ActivityIndicator, FlatList } from "react-native";
import UserCard from "../../components/UserCard";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const View = styled.View`
  align-items: center;
  height: 150px;
`;
const Image = styled.Image`
  width: 100%;
  height: 150px;
`;

interface IProps {
  coverImg?: string;
  teamName: string;
  sport: GetTeam_getTeam_team_sport;
  dialogVisible: boolean;
  rating: number;
  onStarRatingPress: (rating: number) => void;
  closeDialog: () => void;
  showDialog: () => void;
  onSubmitRating: () => void;
}

const TeamInfo: React.FC<IProps> = ({
  coverImg,
  teamName,
  sport,
  dialogVisible,
  rating,
  onStarRatingPress,
  closeDialog,
  showDialog,
  onSubmitRating,
}) => {
  return (
    <View>
      {coverImg ? <Image source={{ uri: MEDIA_URL + coverImg }} /> : null}
      <Headline>{teamName}</Headline>
      <RatingChip
        sportUuid={sport.sportUuid}
        name={sport.name}
        onPress={showDialog}
      />
    </View>
  );
};

const TeamProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const uuid = navigation.getParam("uuid");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const {
    data: { getTeam: { team = null } = {} } = {},
    loading,
    client,
  } = useQuery<GetTeam, GetTeamVariables>(GET_TEAM, {
    variables: { uuid },
  });
  const onStarRatingPress = (rating) => {
    setRating(rating);
  };
  const onSubmitRating = () => {
    closeDialog();
  };
  const showDialog = () => {
    setDialogVisible(true);
  };
  const closeDialog = () => {
    setRating(0);
    setDialogVisible(false);
  };
  if (loading || !team) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <FlatList
        data={team.members}
        keyExtractor={(item) => item.uuid.toString()}
        renderItem={({ item }) => (
          <UserCard
            uuid={item.uuid}
            name={item.name}
            username={item.username}
            userImg={item.userImg}
            bio={item.bio}
            isFollowing={item.isFollowing}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => (
          <TeamInfo
            coverImg={team.coverImg}
            teamName={team.teamName}
            sport={team.sport}
            dialogVisible={dialogVisible}
            rating={rating}
            onStarRatingPress={onStarRatingPress}
            onSubmitRating={onSubmitRating}
            closeDialog={closeDialog}
            showDialog={showDialog}
          />
        )}
        ListFooterComponent={() =>
          team.isAdmin && (
            <Button
              onPress={() => {
                console.log("EditTeam");
              }}
            >
              Edit team
            </Button>
          )
        }
      />
    );
  }
};
TeamProfileScreen.navigationOptions = {
  title: "Team",
};

export default TeamProfileScreen;
