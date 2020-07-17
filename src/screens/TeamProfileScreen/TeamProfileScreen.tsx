import React, { useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, FlatList } from "react-native";
import { Headline, Divider, Button } from "react-native-paper";
import { useQuery } from "react-apollo-hooks";

import { GetTeam, GetTeamVariables } from "../../types/api";
import { MEDIA_URL } from "../../constants/urls";
import RatingChip from "../../components/RatingChip";
import { GET_TEAM, RATE_TEAM } from "./TeamProfileScreenQueries";
import UserCard from "../../components/UserCard";
import RatingDialog from "../../components/RatingDialog";
import { useMutation } from "react-apollo";
import { RateTeam, RateTeamVariables } from "../../types/api";

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
const Touchable = styled.TouchableOpacity``;

interface IProps {
  coverImg: string;
  teamName: string;
  sport: any;
  showDialog: () => void;
  rating: number;
}

const TeamInfoArea: React.FC<IProps> = ({
  coverImg,
  teamName,
  sport,
  showDialog,
  rating,
}) => {
  return (
    <Container>
      {coverImg ? <Image source={{ uri: MEDIA_URL + coverImg }} /> : null}
      <View>
        <Touchable onPress={() => showDialog}>
          <Headline>
            {teamName}⭐️{rating}
          </Headline>
        </Touchable>
        <RatingChip
          sportId={sport.sportId}
          name={sport.name}
          onChipPress={() => {}}
        />
      </View>
    </Container>
  );
};

const TeamProfileScreen = ({ navigation }) => {
  const teamId = navigation.getParam("teamId");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const { data: { getTeam: { team = null } = {} } = {}, loading } = useQuery<
    GetTeam,
    GetTeamVariables
  >(GET_TEAM, { variables: { teamId } });

  const onStarRatingPress = (rating: number) => {
    setRating(rating);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setRating(0);
    setDialogVisible(false);
  };

  const [rateTeamFn, { loading: rateTeamLoading }] = useMutation<
    RateTeam,
    RateTeamVariables
  >(RATE_TEAM, {
    variables: { teamId, rating },
  });

  const onSubmit = () => {
    rateTeamFn();
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
            <TeamInfoArea
              coverImg={team.coverImg}
              teamName={team.teamName}
              sport={team.sport}
              showDialog={showDialog}
              rating={team.rating}
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
TeamProfileScreen.navigationOptions = {
  title: "Team Profile",
};

export default TeamProfileScreen;
