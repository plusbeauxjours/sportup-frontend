import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Appbar, Headline, Divider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";

import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { useLazyQuery } from "react-apollo";
import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserCard from "../../components/UserCard";
import TeamCard from "../../components/TeamCard";
import EventCard from "../../components/EventCard";

const SectionTitle = styled.Text`
  text-transform: uppercase;
  margin-left: 10px;
  font-size: 10px;
  font-weight: 600;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<string>("");
  const [
    search,
    {
      data: {
        getSearchUsers: { users = null } = {},
        getSearchTeams: { teams = null } = {},
        getSearchEvents: { events = null } = {},
      } = {},
      loading,
    },
  ] = useLazyQuery<GetSearchResults, GetSearchResultsVariables>(
    GET_SEARCH_RESULTS,
    { variables: { searchText } }
  );

  const handleChange = (text) => {
    setSearchText(text);
  };

  const RenderUser = () => (
    <>
      <SectionTitle>Users</SectionTitle>
      {users && users.length !== 0 ? (
        users?.map((user, index) => <UserCard user={user} />)
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  const RenderTeam = () => (
    <>
      <SectionTitle>Teams</SectionTitle>
      {teams && teams.length !== 0 ? (
        teams?.map((team, index) => <TeamCard team={team} />)
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  const RenderEvent = () => (
    <>
      <SectionTitle>Events</SectionTitle>
      {events && events.length !== 0 ? (
        events?.map((event, index) => <EventCard event={event} />)
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  useEffect(() => {
    search();
  }, [searchText]);

  return (
    <React.Fragment>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChange}
        value={searchText}
      />
      <Container>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: "#fff",
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <RenderUser />
            <Divider />
            <RenderTeam />
            <Divider />
            <RenderEvent />
          </KeyboardAwareScrollView>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SearchScreen;
