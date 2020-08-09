import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetUserTeams, GetUserTeamsVariables } from "../../types/api";
import { GET_USER_TEAMS } from "./TeamsScreenQueries";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import TeamCard from "../../components/TeamCard";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TeamsScreen = ({ route }) => {
  const { userId } = route.params;
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
          showsVerticalScrollIndicator={false}
          keyExtractor={(team) => team.id.toString()}
          renderItem={({ item }) => (
            <TeamCard enableMessage={true} team={item} />
          )}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
        />
      </Container>
    );
  }
  return <Loader />;
};

export default TeamsScreen;
