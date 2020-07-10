import React from "react";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { ActivityIndicator, Picker, Alert } from "react-native";
import { ListItem, List } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Subheading, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_USER_FROM_USERNAME } from "../CreateTeamScreen/CreateTeamScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import { GET_TEAM } from "../TeamProfileScreen/TeamProfileScreenQueries";
import { NavigationScreenProp } from "react-navigation";
import { UPDATE_TEAM } from "./EditTeamProfileScreenQueries";
import { UpdateTeam, UpdateTeamVariables } from "../../types/api";

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  teamName: string;
  addUser: string;
  userLoading: boolean;
  sportId: string;
  membersList: any;
}

export default class EditTeamScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: "Edit Team",
  };

  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      addUser: "",
      userLoading: false,
      sportId: "1",
      membersList: [],
    };
  }

  public componentDidMount = () => {
    const client = this.props.navigation.getParam("client");
    const { team } = client.readQuery({
      query: GET_TEAM,
      variables: { id: this.props.navigation.getParam("teamId") },
    });
    this.setState((prev) => ({
      ...prev,
      teamName: team.name,
      sportId: team.sport.sportId,
      membersList: team.members.map((member) => ({
        id: member.id,
        name: member.name,
        username: member.username,
        profile: { profileImg: member.profile.profileImg },
      })),
    }));
  };

  public onUserFetched = (user) => {
    this.setState((prev) => ({
      ...prev,
      membersList: [...prev.membersList, user],
    }));
  };

  public onAddPress = async (client) => {
    this.setState({ userLoading: true });
    try {
      const { data } = await client.query({
        query: GET_USER_FROM_USERNAME,
        variables: { username: this.state.addUser.trim() },
      });
      this.onUserFetched(data.userProfile);
    } catch (error) {
      Alert.alert("", error.message);
    }
    this.setState((prev) => ({ ...prev, userLoading: false }));
  };

  public updateCache = (cache, { data: { updateTeam } }) => {
    const query = cache.readQuery({
      query: GET_TEAM,
      variables: { id: this.props.navigation.getParam("teamId") },
    });
    cache.writeQuery({
      query: GET_TEAM,
      data: {
        team: {
          ...query.team,
          name: updateTeam.team.name,
          coverImg: updateTeam.team.coverImg,
          sport: updateTeam.team.sport,
          members: updateTeam.team.members,
        },
      },
    });
  };

  public removeMember = (index) => {
    this.setState((prev) => ({
      ...prev,
      membersList: prev.membersList.filter((_, idx) => idx !== index),
    }));
  };

  public render() {
    return (
      <ApolloConsumer>
        {(client) => {
          return (
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
              keyboardShouldPersistTaps="handled"
            >
              <Query
                query={GET_ALL_SPORTS}
                onError={(error) => {
                  Alert.alert("", error.message);
                }}
              >
                {({ loading, data }) => {
                  if (loading) {
                    return <ActivityIndicator size="large" />;
                  }

                  return (
                    <React.Fragment>
                      <TextInput
                        label="Team name"
                        value={this.state.teamName}
                        onChangeText={(teamName) => {
                          this.setState({ teamName });
                        }}
                        style={{ width: "90%", alignSelf: "center" }}
                      />
                      <PickerContainer>
                        <Subheading style={{ fontWeight: "bold" }}>
                          Sport
                        </Subheading>
                        <Picker
                          selectedValue={this.state.sportId}
                          style={{ width: 200 }}
                          onValueChange={(value) => {
                            this.setState((prev) => ({
                              ...prev,
                              sportId: value,
                            }));
                          }}
                        >
                          {data.allSports.map(({ sportId, name }) => (
                            <Picker.Item
                              key={sportId}
                              label={name}
                              value={sportId}
                            />
                          ))}
                        </Picker>
                      </PickerContainer>
                      <TextInput
                        label="Add member"
                        placeholder="Enter username..."
                        autoCapitalize="none"
                        value={this.state.addUser}
                        onChangeText={(username) =>
                          this.setState((prev) => ({
                            ...prev,
                            addUser: username,
                          }))
                        }
                        style={{ width: "90%", alignSelf: "center" }}
                      />
                      <Button
                        loading={this.state.userLoading}
                        disabled={this.state.userLoading || !this.state.addUser}
                        onPress={() => {
                          this.onAddPress(client);
                        }}
                        style={{
                          marginTop: 10,
                          width: "90%",
                          alignSelf: "center",
                        }}
                      >
                        Add
                      </Button>
                      <List>
                        {this.state.membersList.map(
                          ({ id, userImg, name, username }, index) => (
                            <ListItem
                              key={id}
                              leftAvatar={{
                                rounded: true,
                                source: {
                                  uri: userImg
                                    ? MEDIA_URL + userImg
                                    : NO_AVATAR_THUMBNAIL,
                                },
                              }}
                              title={name}
                              subtitle={username}
                              rightIcon={{ name: "cancel" }}
                              onPress={() => {
                                this.removeMember(index);
                              }}
                            />
                          )
                        )}
                      </List>
                      <Mutation<UpdateTeam, UpdateTeamVariables>
                        mutation={UPDATE_TEAM}
                        variables={{
                          teamId: this.props.navigation.getParam("teamId"),
                          teamName: this.state.teamName,
                          sportId: this.state.sportId,
                          memberIds: this.state.membersList.map(({ id }) =>
                            parseInt(id, 10)
                          ),
                        }}
                        update={this.updateCache}
                        onError={(error) => {
                          Alert.alert("", error.message);
                        }}
                      >
                        {(updateTeam, vars) => (
                          <Button
                            loading={vars.loading}
                            disabled={
                              this.state.userLoading ||
                              !this.state.teamName ||
                              vars.loading
                            }
                            onPress={() => {
                              updateTeam();
                              this.props.navigation.goBack();
                            }}
                            style={{
                              marginTop: 20,
                              width: "90%",
                              alignSelf: "center",
                            }}
                          >
                            Save
                          </Button>
                        )}
                      </Mutation>
                    </React.Fragment>
                  );
                }}
              </Query>
            </KeyboardAwareScrollView>
          );
        }}
      </ApolloConsumer>
    );
  }
}
