import React from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { observable, action } from "mobx";
import { observer, Observer } from "mobx-react/native";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Searchbar, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";
import { UPDATE_SPORTS } from "./EditSportsScreenQueries";

interface IProps extends NavigationStackScreenProps {}

@observer
export default class EditSportsScreen extends React.Component<IProps> {
  public updateSportsFn;
  static navigationOptions = {
    title: "Edit Sports",
  };

  @observable
  query = "";

  constructor(props) {
    super(props);

    this.allSports = [];
    this.sports = observable([]);
    this.selectedSports = observable([]);
  }

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

  public updateCache = (
    cache,
    {
      data: {
        updateSports: { user },
      },
    }
  ) => {
    try {
      const data = cache.readQuery({ query: ME });
      if (data) {
        cache.writeQuery({
          query: ME,
          data: {
            ...data,
            me: {
              ...data.me,
              user: {
                ...data.me.user,
                sports: user.sports,
              },
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
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
        <Query
          query={GET_ALL_SPORTS}
          fetchPolicy="network-only"
          onError={(error) => Alert.alert("", error.message)}
        >
          {({
            loading,
            data: { getAllSports: { sports = null } = {} } = {},
            client,
          }) => {
            if (loading) {
              return <ActivityIndicator size="large" />;
            }
            this.allSports = sports;
            this.sports = observable(this.allSports);
            this.selectedSports = observable(sports?.map(() => false));
            const { me } = client.readQuery({
              query: gql`
                {
                  me {
                    user {
                      sports {
                        id
                      }
                    }
                  }
                }
              `,
            });
            me.user.sports.forEach(({ pk }) => {
              console.log(pk);
              this.selectedSports[pk - 1] = true;
            });
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
                        {this.sports?.map(({ id, name }) => (
                          <RatingChip
                            sportId={id}
                            name={name}
                            selected={this.selectedSports[id - 1]}
                            key={id}
                            onChipPress={() => this.toggleSportChip(id - 1)}
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

        <Mutation
          mutation={UPDATE_SPORTS}
          update={this.updateCache}
          onError={(error) => Alert.alert("", error.message)}
        >
          {(updateSportsFn, { loading }) => (
            <Button
              onPress={() => {
                const selectedSportIds = [];
                this.selectedSports.forEach((sport, index) => {
                  if (sport === true) {
                    selectedSportIds.push(index + 1);
                  }
                });
                updateSportsFn({
                  variables: {
                    sportIds: selectedSportIds,
                  },
                });
                this.props.navigation.goBack();
              }}
              style={{ width: "90%", alignSelf: "center" }}
              loading={loading}
              disabled={loading}
            >
              Save
            </Button>
          )}
        </Mutation>
      </KeyboardAwareScrollView>
    );
  }
}
