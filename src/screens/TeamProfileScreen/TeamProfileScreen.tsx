import React, { useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, FlatList, Alert } from "react-native";
import { Headline, Divider, Button } from "react-native-paper";
import { useQuery } from "react-apollo-hooks";

import {
  GetTeam_getTeam_team_sport,
  GetTeam,
  GetTeamVariables,
} from "../../types/api";
import { MEDIA_URL } from "../../constants/urls";
import RatingChip from "../../components/RatingChip";
import { GET_TEAM } from "./TeamProfileScreenQueries";
import UserCard from "../../components/UserCard";
import RatingDialog from "../../components/RatingDialog";

const View = styled.View`
  align-items: center;
  padding: 5px;
`;
const Container = styled.View`
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
    <Container>
      {coverImg ? <Image source={{ uri: MEDIA_URL + coverImg }} /> : null}
      <View>
        <Headline>{teamName}</Headline>
        <RatingChip
          sportId={sport.sportId}
          name={sport.name}
          onChipPress={showDialog}
        />
      </View>
    </Container>
  );
};

const TeamProfileScreen: React.FC = ({ navigation }) => {
  const teamId = navigation.getParam("teamId");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const { data: { getTeam: { team = null } = {} } = {}, loading } = useQuery<
    GetTeam,
    GetTeamVariables
  >(GET_TEAM, { variables: { teamId } });

  const onStarRatingPrrateress = (rating: number) => {
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

  // const [rateTeamFn, { loading: rateTeamLoading }] = useMutation<
  //   RateTeam,
  //   RateUserSportVariables
  // >(RATE_USER_SPORT, {
  //   variables: { userId, sportId: ratingSportWithId, rating },
  // });

  const onSubmit = () => {
    // rateTeamFn();
    closeDialog();
  };
  if (loading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <>
        <FlatList
          data={team.members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard
              userId={item.id}
              name={item.name}
              username={item.username}
              userImg={item.userImg}
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
              closeDialog={closeDialog}
              showDialog={showDialog}
              onSubmitRating={onSubmitRating}
            />
          )}
          ListFooterComponent={
            team.isAdmin && (
              <Button
                onPress={() => {
                  navigation.navigate("EditTeamProfileScreen", { team });
                }}
              >
                Edit team
              </Button>
            )
          }
        />
        <RatingDialog
          visible={dialogVisible}
          rating={rating}
          onStarRatingPress={onStarRatingPress}
          close={closeDialog}
          onSubmit={onSubmit}
        />
      </>
    );
  }
};

export default TeamProfileScreen;
