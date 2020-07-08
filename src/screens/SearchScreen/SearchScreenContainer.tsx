import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { Avatar } from "react-native-elements";
import { useQuery } from "react-apollo-hooks";
import { ListItem } from "react-native-paper";

import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import SearchScreenPresenter from "./SearchScreenPresenter";
import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { withNavigation } from "react-navigation";

interface IProps {
  navigation: any;
}
const SearchScreenContainer: React.FC<IProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    data: {
      getSearchUsers: { users: searchedUsers = null } = {},
      getSearchTeams: { teams: searchedTeams = null } = {},
      getSearchEvents: { events: searchEvents = null } = {},
    } = {},
    loading: getSearchLoading,
  } = useQuery<GetSearchResults, GetSearchResultsVariables>(
    GET_SEARCH_RESULTS,
    { variables: { searchText: search } }
  );
  const onIconPress = () => {
    try {
      setLoading(true);
      setUsers(searchedUsers);
      setTeams(searchedTeams);
      setEvents(searchEvents);
    } catch (error) {
      Alert.alert("", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item }: any) => (
    <ListItem
      title={item.name}
      description={`@${item.username}`}
      avatar={
        <Avatar
          rounded
          source={
            item.userImg
              ? { uri: MEDIA_URL + item.userImg }
              : NO_AVATAR_THUMBNAIL
          }
        />
      }
      onPress={() => {
        navigation.push("Profile", { userId: item.id });
      }}
    />
  );

  const renderTeam = ({ item }: any) => (
    <ListItem
      title={item.name}
      description={`Created by ${item.createdBy.name} (@${item.createdBy.username})`}
      avatar={
        item.coverImg ? { uri: MEDIA_URL + item.coverImg } : NO_AVATAR_THUMBNAIL
      }
      onPress={() => {
        navigation.push("Team", { teamId: item.id });
      }}
    />
  );

  const renderEvent = ({ item }: any) => (
    <ListItem
      title={item.name}
      description={`Created by ${item.owner.name} (@${item.owner.username})`}
      avatar={
        item.coverImg ? { uri: MEDIA_URL + item.coverImg } : NO_AVATAR_THUMBNAIL
      }
      onPress={() => {
        navigation.push("EventScreen", { eventId: item.id });
      }}
    />
  );
  return (
    <SearchScreenPresenter
      loading={loading}
      users={users}
      renderUser={renderUser}
      teams={teams}
      renderTeam={renderTeam}
      events={events}
      renderEvent={renderEvent}
      setSearch={setSearch}
      search={search}
      onIconPress={onIconPress}
    />
  );
};

export default withNavigation(SearchScreenContainer);
