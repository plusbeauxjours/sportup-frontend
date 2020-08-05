import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetUserTeams, GetUserTeamsVariables } from "../../types/api";
import { GET_USER_TEAMS } from "./TeamsScreenQueries";
import { FlatList } from "react-native";
import TeamCard from "../../components/TeamCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";
import Loader from "../../components/Loader";
import BackBtn from "../../components/BackBtn";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

const TeamsScreen: NavigationStackScreenComponent<IProps> = () => {
  const navigation = useNavigation();
  // const userId = navigation.getParam("userId");
  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserTeams,
    GetUserTeamsVariables
  >(GET_USER_TEAMS, {
    variables: { userId },
    fetchPolicy: "network-only",
  });
  if (!loading) {
    return (
      <Container>
        <FlatList
          data={user.teamSet}
          renderItem={({ item }) => (
            <TeamCard enableMessage={true} team={item} />
          )}
          keyExtractor={(team) => team.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    );
  }
  return <Loader />;
};
TeamsScreen.navigationOptions = {
  title: "Teams",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default TeamsScreen;
