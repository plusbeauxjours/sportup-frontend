import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, Observer } from "mobx-react/native";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Searchbar, Button, ToolbarAction } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Query } from "react-apollo";
import { GET_ALL_SPORTS } from "./FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";

@observer
export default class FindPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Find",
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

  constructor(props) {
    super(props);

    this.allSports = [];
    this.sports = observable([]);
    this.selectedSports = observable([]);
  }

  onFindPlayerPress = () => {
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

  onFindTeamPress = () => {
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
  onChangeText = (query) => {
    this.sports = this.allSports.filter((sport) =>
      sport.name.toLowerCase().includes(query.toLowerCase())
    );
    this.query = query;
  };

  @action
  toggleSportChip = (index) => {
    this.selectedSports[index] = !this.selectedSports[index];
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Query
          query={GET_ALL_SPORTS}
          fetchPoliy="network-only"
          onError={(error) => Alert.alert("", error.message)}
        >
          {({ loading, data }) => {
            if (loading) {
              return <ActivityIndicator size="large" />;
            }

            this.allSports = data.allSports;
            this.sports = observable(this.allSports);
            this.selectedSports = observable(data.allSports.map(() => false));

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
                        {this.sports.map(({ sportId, name }) => (
                          <RatingChip
                            sportId={sportId}
                            name={name}
                            selected={this.selectedSports[sportId - 1]}
                            key={sportId}
                            onChipPress={() =>
                              this.toggleSportChip(sportId - 1)
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
