import React, { Component } from "react";
import { FlatList, Alert, View, ActivityIndicator } from "react-native";
import { observer, Observer } from "mobx-react/native";
import { Headline } from "react-native-paper";

import { Query } from "react-apollo";
import { GET_USERS_FOR_GAME } from "./FoundPlayersListScreenQueries";
import PlayerCard from "../../components/PlayerCard";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

@observer
export default class FoundPlayersListScreen extends Component<IProps> {
  static navigationOptions = {
    title: "Players near you",
  };

  public constructor(props) {
    super(props);
    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
  }

  public renderEmptyComponent = () => (
    <Observer>
      {() =>
        this.loaded ? (
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
    </Observer>
  );

  public render() {
    return (
      <Query
        query={GET_USERS_FOR_GAME}
        variables={{
          sportIds: this.props.navigation.getParam("selectedSportIds"),
        }}
        onError={(error) => {
          Alert.alert("", error.message);
        }}
        fetchPolicy="network-only"
      >
        {({
          data: { getUsersForGames: { users = null } = {} } = {},
          loading,
        }) => {
          return (
            <FlatList
              data={users}
              renderItem={({ item }: any) => {
                return (
                  <PlayerCard
                    id={item.id}
                    userImg={item.userImg}
                    name={item.name}
                    username={item.username}
                    bio={item.bio}
                    isFollowing={item.isFollowing}
                  />
                );
              }}
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
        }}
      </Query>
    );
  }
}
