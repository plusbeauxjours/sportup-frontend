import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Appbar, Headline } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Searchbar } from "react-native-paper";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { useLazyQuery } from "react-apollo";
import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import styled from "styled-components/native";

const SectionTitle = styled.Text`
  font-size: 10px;
  font-weight: 400;
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
    console.log(text);
  };

  const RenderUser = () => (
    <>
      <SectionTitle>Users</SectionTitle>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ListItem
            title={item?.name}
            subtitle={`@${item?.username}`}
            leftAvatar={{
              rounded: true,
              source: {
                uri: item?.userImg
                  ? MEDIA_URL + item?.userImg
                  : NO_AVATAR_THUMBNAIL,
              },
            }}
            onPress={() => {
              navigation.push("UserProfileScreen", { userId: item?.id });
            }}
          />
        )}
        keyExtractor={(itemm, index) => index.toString()}
        ListEmptyComponent={() => (
          <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
            &middot;
          </Headline>
        )}
      />
    </>
  );

  const RenderTeam = () => (
    <>
      <SectionTitle>Teams</SectionTitle>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <ListItem
            title={item?.teamName}
            subtitle={`Created by ${item?.createdBy.name} (@${item?.createdBy.username})`}
            onPress={() => {
              navigation.push("TeamProfileScreen", { teamId: item?.id });
            }}
          />
        )}
        keyExtractor={(itemm, index) => index.toString()}
        ListEmptyComponent={() => (
          <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
            &middot;
          </Headline>
        )}
      />
    </>
  );

  const RenderEvent = () => (
    <>
      <SectionTitle>Events</SectionTitle>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <ListItem
            title={item?.name}
            subtitle={`Created by ${item?.owner.name} (@${item?.owner.username})`}
            onPress={() => {
              navigation.push("EventScreen", { eventId: item?.id });
            }}
          />
        )}
        keyExtractor={(itemm, index) => index.toString()}
        ListEmptyComponent={() => (
          <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
            &middot;
          </Headline>
        )}
      />
    </>
  );

  useEffect(() => {
    search();
    console.log(users);
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
        <>
          <RenderUser />
          <RenderTeam />
          <RenderEvent />
        </>
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
