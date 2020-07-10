import React from "react";
import styled from "styled-components/native";
import { Query } from "react-apollo";
import { ActivityIndicator, FlatList, Alert } from "react-native";
import { Headline, Divider, Button } from "react-native-paper";
import { NavigationStackScreenProps } from "react-navigation-stack";

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
import { observer, Observer } from "mobx-react/native";
import { action, observable } from "mobx";

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
      <Observer>
        {() => (
          <RatingDialog
            visible={dialogVisible}
            rating={rating}
            onStarRatingPress={onStarRatingPress}
            close={closeDialog}
            onSubmit={onSubmitRating}
          />
        )}
      </Observer>
    </Container>
  );
};

@observer
export default class TeamProfileScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: "Team",
  };

  @observable
  dialogVisible = false;
  @observable
  loadedInfo = false;

  rating = 0;

  onStarRatingPress = (rating) => {
    this.rating = rating;
  };

  onSubmitRating = () => {
    this.closeDialog();
  };

  @action
  showDialog = () => {
    this.dialogVisible = true;
  };

  @action
  closeDialog = () => {
    this.rating = 0;
    this.dialogVisible = false;
  };

  render() {
    return (
      <Query<GetTeam, GetTeamVariables>
        query={GET_TEAM}
        variables={{ teamId: this.props.navigation.getParam("teamId") }}
      >
        {({
          data: { getTeam: { team = null } = {} } = {},
          loading,
          error,
          client,
        }) => {
          if (loading) {
            return <ActivityIndicator size="large" />;
          }

          if (error) {
            Alert.alert("", error.message);
            return null;
          }
          return (
            <FlatList
              data={team.members}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <UserCard
                  userId={item.id}
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
                  dialogVisible={this.dialogVisible}
                  rating={this.rating}
                  onStarRatingPress={this.onStarRatingPress}
                  closeDialog={this.closeDialog}
                  showDialog={this.showDialog}
                  onSubmitRating={this.onSubmitRating}
                />
              )}
              ListFooterComponent={
                team.isAdmin && (
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate("EditTeamProfileScreen", {
                        teamId: team.id,
                        client,
                      });
                    }}
                  >
                    Edit team
                  </Button>
                )
              }
            />
          );
        }}
      </Query>
    );
  }
}
