import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, Observer } from "mobx-react/native";
import { View, Alert, ActivityIndicator } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Query } from "react-apollo";
import { GET_ALL_SPORTS } from "./FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";
import { GetAllSports } from "../../types/api";

@observer
export default class FindPlayerScreen extends Component {
  @observable
  query = "";

  public constructor(props) {
    super(props);

    this.allSports = [];
    this.sports = observable([]);
    this.selectedSports = observable([]);
  }

  public onFindPlayerPress = () => {
    const selectedSportIds = [];
    this.selectedSports.forEach((sport, index) => {
      if (sport === true) {
        selectedSportIds.push(index + 1);
      }
    });
    this.props.navigation.push("FoundPlayers", {
      selectedSportIds,
    });
  };

  public onFindTeamPress = () => {
    const selectedSportIds = [];
    this.selectedSports.forEach((sport, index) => {
      if (sport === true) {
        selectedSportIds.push(index + 1);
      }
    });
    this.props.navigation.push("FoundTeams", {
      selectedSportIds,
    });
  };

  @action
  public onChangeText = (query) => {
    this.sports = this.allSports.filter((sport) =>
      sport.name.toLowerCase().includes(query.toLowerCase())
    );
    this.query = query;
  };

  @action
  public toggleSportChip = (index) => {
    this.selectedSports[index] = !this.selectedSports[index];
  };

  public render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Query<GetAllSports>
          query={GET_ALL_SPORTS}
          fetchPoliy="network-only"
          onError={(error) => Alert.alert("", error.message)}
        >
          {({
            data: { getAllSports: { sports = null } = {} } = {},
            loading,
          }) => {
            if (loading) {
              return <ActivityIndicator size="large" />;
            }

            this.allSports = sports;
            this.sports = observable(this.allSports);
            this.selectedSports = observable(sports.map(() => false));

            return (
              <Observer>
                {() => (
                  <View>
                    <Searchbar
                      placeholder="Search"
                      onChangeText={this.onChangeText}
                      value={this.query}
                    />
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {sports?.map((sport) => (
                          <RatingChip
                            sportId={sport.sportId}
                            name={sport.name}
                            selected={
                              this.selectedSports[parseInt(sport.sportId) - 1]
                            }
                            key={sport.sportId}
                            onChipPress={() =>
                              this.toggleSportChip(parseInt(sport.sportId) - 1)
                            }
                          />
                        ))}
                      </View>
                    </KeyboardAwareScrollView>
                  </View>
                )}
              </Observer>
            );
          }}
        </Query>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button onPress={this.onFindTeamPress} style={{ flex: 1 }}>
            Find A Team
          </Button>
          <Button onPress={this.onFindPlayerPress} style={{ flex: 1 }}>
            Find A Player
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
