import React, { Component } from "react";
import { SectionList, Alert } from "react-native";
import { observable, action } from "mobx";
import { Observer } from "mobx-react/native";
import {
  Searchbar,
  ListItem,
  Caption,
  Divider,
  ToolbarAction,
} from "react-native-paper";
import { Avatar } from "react-native-elements";
import { ApolloConsumer } from "react-apollo";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_SEARCH_RESULTS } from "./SearchQueries";

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Search",
    headerLeft: (
      <ToolbarAction
        dark
        icon="menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
  });

  @observable
  query = "";

  state = {
    users: [],
    teams: [],
    events: [],
  };

  public onIconPress = async (client) => {
    try {
      const { data } = await client.query({
        query: GET_SEARCH_RESULTS,
        variables: { searchText: this.query },
      });
      this.setState((prev) => ({
        ...prev,
        users: data.searchUsers,
        teams: data.searchTeams,
        events: data.searchEvents,
      }));
    } catch (error) {
      Alert.alert("", error.message);
    }
  };

  @action
  public onChangeText = (query) => {
    this.query = query;
  };

  public renderUser = ({ item }) => (
    <ListItem
      title={item.name}
      description={`@${item.username}`}
      avatar={
        <Avatar
          rounded
          source={
            item.profile.profileImg
              ? { uri: MEDIA_URL + item.profile.profileImg }
              : NO_AVATAR_THUMBNAIL
          }
        />
      }
      onPress={() => {
        this.props.navigation.push("Profile", { userId: item.id });
      }}
    />
  );

  public renderTeam = ({ item }) => (
    <ListItem
      title={item.name}
      description={`Created by ${item.createdBy.name} (@${item.createdBy.username})`}
      // avatar={
      //   item.coverImg ? { uri: MEDIA_URL + item.coverImg } : NO_AVATAR_THUMBNAIL
      // }
      onPress={() => {
        this.props.navigation.push("Team", { teamId: item.id });
      }}
    />
  );

  public renderEvent = ({ item }) => (
    <ListItem
      title={item.name}
      description={`Created by ${item.owner.name} (@${item.owner.username})`}
      // avatar={
      //   item.coverImg ? { uri: MEDIA_URL + item.coverImg } : NO_AVATAR_THUMBNAIL
      // }
      onPress={() => {
        this.props.navigation.push("EventScreen", { eventId: item.id });
      }}
    />
  );

  public render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <SectionList
            renderItem={() => {}}
            renderSectionHeader={({ section: { title } }) => (
              <Caption style={{ paddingLeft: 10 }}>{title}</Caption>
            )}
            sections={[
              {
                title: "Users",
                data: this.state.users,
                renderItem: this.renderUser,
              },
              {
                title: "Teams",
                data: this.state.teams,
                renderItem: this.renderTeam,
              },
              {
                title: "Events",
                data: this.state.events,
                renderItem: this.renderEvent,
              },
            ]}
            // ListEmptyComponent={() => {
            //   if (this.state.loading) {
            //     return <ActivityIndicator size="small" margin={20} />;
            //   }
            //   return null;
            // }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            ListHeaderComponent={() => (
              <Observer>
                {() => (
                  <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeText}
                    value={this.query}
                    onIconPress={() => {
                      this.onIconPress(client);
                    }}
                  />
                )}
              </Observer>
            )}
          />
        )}
      </ApolloConsumer>
    );
  }
}
