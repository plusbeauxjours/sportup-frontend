import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { Headline } from "react-native-paper";
import TeamCard from "../../components/TeamCard";
import { GET_TEAMS_FOR_GAME } from "./FoundTeamsListScreenQueries";
import { useQuery } from "react-apollo";
import { GetTeamsForGame, GetTeamsForGameVariables } from "../../types/api";

const FoundTeamsListScreen = ({ navigation }) => {
  const sportIds = navigation.getParam("selectedSportIds");
  const {
    data: { getTeamsForGame: { teams = null } = {} } = {},
    loading,
  } = useQuery<GetTeamsForGame, GetTeamsForGameVariables>(GET_TEAMS_FOR_GAME, {
    variables: { sportIds },
    fetchPolicy: "network-only",
  });
  return (
    <FlatList
      data={teams}
      renderItem={({ item }) => <TeamCard enableMessage {...item} />}
      keyExtractor={(player: any) => player.id.toString()}
      ListEmptyComponent={() =>
        !loading ? (
          <View
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Headline style={{ fontWeight: "bold" }}>&middot;</Headline>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )
      }
    />
  );
};
FoundTeamsListScreen.navigationOptions = {
  title: "Teams near you",
};
export default FoundTeamsListScreen;
