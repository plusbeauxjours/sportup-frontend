import React, { useState, useEffect } from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Button, Subheading } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { ActivityIndicator, Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { ApolloConsumer, useMutation } from "react-apollo";
import styled from "styled-components/native";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import {
  UpdateTeam,
  UpdateTeamVariables,
  GetTeam,
  GetTeamVariables,
} from "../../types/api";
import { GetAllSports } from "../../types/api";
import { GET_USER_FROM_USERNAME } from "../CreateTeamScreen/CreateTeamScreenQueries";
import { GET_TEAM } from "../TeamProfileScreen/TeamProfileScreenQueries";
import { UPDATE_TEAM } from "./EditTeamProfileScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditTeamProfileScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [teamId, setTeamId] = useState<string>(navigation.getParam("id"));
  const [teamName, setTeamName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [sportId, setSportId] = useState<string>(
    "46800336-cf54-40d3-8385-78d7d47d2f3c"
  );
  const [membersList, setMembersList] = useState<any>([]);
  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);
  const [updateTeamFn, { loading: updateTeamLoading }] = useMutation<
    UpdateTeam,
    UpdateTeamVariables
  >(UPDATE_TEAM, {
    variables: {
      teamId,
      teamName,
      sportId,
      memberIds: membersList.map(({ id }) => id),
    },
    update(cache, { data: { updateTeam } }) {
      try {
        const { getTeam } = cache.readQuery<GetTeam, GetTeamVariables>({
          query: GET_TEAM,
          variables: { id: navigation.getParam("id") },
        });
        cache.writeQuery({
          query: GET_TEAM,
          variables: { id: navigation.getParam("id") },
          data: {
            getTeam: {
              ...getTeam,
              team: {
                ...getTeam.team,
                teamName: updateTeam.team.teamName,
                coverImg: updateTeam.team.coverImg,
                sport: updateTeam.team.sport,
                members: updateTeam.team.members,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const onUserFetched = (user) => {
    setMembersList([...membersList, user]);
  };

  const onAddPress = async (client) => {
    setUserLoading(true);
    try {
      const { data } = await client.query({
        query: GET_USER_FROM_USERNAME,
        variables: { username: username.trim() },
      });
      onUserFetched(data.getUserFromUsername.user);
    } catch (e) {
      console.log(e);
    }
    setUserLoading(false);
  };

  const removeMember = (index) => {
    setMembersList((membersList) =>
      membersList.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    const client = navigation.getParam("client");
    const { getTeam } = client.readQuery({
      query: GET_TEAM,
      variables: { id: navigation.getParam("id") },
    });
    setTeamName(getTeam.team.teamName);
    setSportId(getTeam.team.sport.sportId);
    setMembersList(
      getTeam.team.members.map((member) => ({
        id: member.id,
        name: member.name,
        username: member.username,
        userImg: member.userImg,
      }))
    );
  }, []);

  if (getAllSportsLoading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="handled"
      >
        <React.Fragment>
          <TextInput
            label="Team name"
            value={teamName}
            onChangeText={(text) => setTeamName(text)}
            style={{ width: "90%", alignSelf: "center" }}
          />
          <PickerContainer>
            <Subheading style={{ fontWeight: "bold" }}>Sport</Subheading>
            <Picker
              selectedValue={sportId}
              style={{ width: 200 }}
              onValueChange={(value) => {
                setSportId(value);
              }}
            >
              {sports.map(({ sportId, name }) => (
                <Picker.Item key={sportId} label={name} value={sportId} />
              ))}
            </Picker>
          </PickerContainer>
          <TextInput
            label="Add member"
            placeholder="Enter username..."
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={{ width: "90%", alignSelf: "center" }}
          />
          <ApolloConsumer>
            {(client) => (
              <Button
                loading={userLoading}
                disabled={userLoading || !username}
                onPress={() => {
                  onAddPress(client);
                }}
                style={{ marginTop: 10, width: "90%", alignSelf: "center" }}
              >
                Add
              </Button>
            )}
          </ApolloConsumer>
          {membersList.map(({ id, userImg, name, username }, index) => (
            <ListItem
              key={id}
              leftAvatar={{
                rounded: true,
                source: {
                  uri: userImg ? MEDIA_URL + userImg : NO_AVATAR_THUMBNAIL,
                },
              }}
              title={name}
              subtitle={username}
              rightIcon={{ name: "cancel" }}
              onPress={() => {
                removeMember(index);
              }}
            />
          ))}
          <Button
            loading={updateTeamLoading}
            disabled={userLoading || !teamName || updateTeamLoading}
            onPress={() => {
              updateTeamFn();
              navigation.goBack();
            }}
            style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
          >
            Save
          </Button>
        </React.Fragment>
      </KeyboardAwareScrollView>
    );
  }
};
EditTeamProfileScreen.navigationOptions = {
  title: "Edit Team",
};

export default EditTeamProfileScreen;
