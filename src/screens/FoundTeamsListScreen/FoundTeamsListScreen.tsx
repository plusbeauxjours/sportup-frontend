import React, { Component } from "react";
import { FlatList, Alert, View, ActivityIndicator } from "react-native";
import { observable, action, runInAction } from "mobx";
import { observer, Observer } from "mobx-react/native";
import { Headline } from "react-native-paper";
import TeamCard from "../../components/TeamCard";
import { getTeams } from "../../api/find";
import { Query } from "react-apollo";
import { GET_TEAMS_FOR_GAME } from "./FoundTeamsListScreenQueries";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

@observer
export default class FoundTeamsList extends Component<IProps> {
  static navigationOptions = {
    title: "Teams near you",
  };

  @observable
  teams = [];
  @observable
  loaded = false;

  public constructor(props) {
    super(props);

    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
  }

  public componentDidMount = () => {
    this.getTeams();
  };

  @action
  public getTeams = async () => {
    const { userId, selectedSportIds } = this.props.navigation.state.params;
    try {
      const teams = await getTeams(userId, selectedSportIds);
      runInAction(() => {
        this.teams = teams;
        this.loaded = true;
      });
    } catch (error) {
      Alert.alert("", error);
      runInAction(() => {
        this.loaded = true;
      });
    }
  };

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
        query={GET_TEAMS_FOR_GAME}
        variables={{
          sportIds: this.props.navigation.getParam("selectedSportIds"),
        }}
        onError={(error) => {
          Alert.alert("", error.message);
        }}
        fetchPolicy="network-only"
      >
        {({
          data: { getTeamsForGame: { teams = null } = {} } = {},
          loading,
        }) => {
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
        }}
      </Query>
    );
  }
}
