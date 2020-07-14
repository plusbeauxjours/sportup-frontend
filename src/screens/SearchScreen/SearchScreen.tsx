import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Appbar, Headline } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { useLazyQuery } from "react-apollo";
import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const GreyLine = styled.View`
  margin: 10px 0;
  border-bottom-width: 0.3px;
  border-bottom-color: #999;
`;
const SectionTitle = styled.Text`
  font-size: 10px;
  font-weight: 400;
`;
const Container = styled.View`
  padding: 10px;
`;
const SearchScreen = ({ navigation }) => {
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
        users?.map((user) => (
          <ListItem
            key={user.id}
            title={user?.name}
            subtitle={`@${user?.username}`}
            leftAvatar={{
              rounded: true,
              source: {
                uri: user?.userImg
                  ? MEDIA_URL + user?.userImg
                  : NO_AVATAR_THUMBNAIL,
              },
            }}
            onPress={() => {
              navigation.push("UserProfileScreen", { userId: user?.id });
            }}
          />
        ))
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
        teams?.map((team) => (
          <ListItem
            key={team.id}
            title={team?.teamName}
            subtitle={`Created by ${team?.createdBy.name} (@${team?.createdBy.username})`}
            onPress={() => {
              navigation.push("TeamProfileScreen", { teamId: team?.id });
            }}
          />
        ))
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
        events?.map((event) => (
          <ListItem
            key={event.id}
            title={event?.name}
            subtitle={`Created by ${event?.owner.name} (@${event?.owner.username})`}
            onPress={() => {
              navigation.push("EvenctScreen", { eventId: event?.id });
            }}
          />
        ))
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
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "#fff",
            padding: 10,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <RenderUser />
          <GreyLine />
          <RenderTeam />
          <GreyLine />
          <RenderEvent />
        </KeyboardAwareScrollView>
      )}
    </React.Fragment>
  );
};
SearchScreen.navigationOptions = ({ navigation }) => ({
  title: "Search",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});

export default SearchScreen;
