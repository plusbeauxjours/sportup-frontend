import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetUserTeams, GetUserTeamsVariables } from "../../types/api";
import { GET_USER_TEAMS } from "./TeamsScreenQueries";
import { ActivityIndicator, FlatList } from "react-native";
import TeamCard from "../../components/TeamCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  id: string;
}

const TeamsScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const id = navigation.getParam("id");
  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserTeams,
    GetUserTeamsVariables
  >(GET_USER_TEAMS, {
    variables: { id },
    fetchPolicy: "network-only",
  });
  if (!loading) {
    return (
      <FlatList
        data={user.teamSet}
        renderItem={({ item }) => <TeamCard {...item} />}
        keyExtractor={(team) => team.id.toString()}
      />
    );
  }
  return <ActivityIndicator size="large" />;
};
TeamsScreen.navigationOptions = {
  title: "Teams",
};

export default TeamsScreen;
