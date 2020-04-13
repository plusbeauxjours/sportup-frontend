import React, { useState, useEffect } from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Button, Subheading } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { ActivityIndicator, Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { ApolloConsumer, useMutation } from "react-apollo";
import styled from "styled-components";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import {
  UpdateTeam,
  UpdateTeamVariables,
  GetTeam,
  GetTeamVariables,
} from "../../types/api";
import { GetAllSports } from "../../types/api";
import {
  GET_ALL_SPORTS,
  GET_USER_FROM_USERNAME,
} from "../CreateTeamScreen/CreateTeamScreenQueries";
import { GET_TEAM } from "../TeamProfileScreen/TeamProfileScreenQueries";
import { UPDATE_TEAM } from "./EditTeamProfileScreenQueries";

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditTeamProfileScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [teamUuid, setTeamUuid] = useState<string>(navigation.getParam("uuid"));
  const [teamName, setTeamName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [sportUuid, setSportUuid] = useState<string>(
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
      teamUuid,
      teamName,
      sportUuid,
      memberUuids: membersList.map(({ uuid }) => uuid),
    },
    update(cache, { data: { updateTeam } }) {
      try {
        const { getTeam } = cache.readQuery<GetTeam, GetTeamVariables>({
          query: GET_TEAM,
          variables: { uuid: navigation.getParam("uuid") },
        });
        console.log("getTeam", getTeam);
        console.log("updateTeam", updateTeam);
        cache.writeQuery({
          query: GET_TEAM,
          variables: { uuid: navigation.getParam("uuid") },
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
      variables: { uuid: navigation.getParam("uuid") },
    });
    setTeamName(getTeam.team.teamName);
    setSportUuid(getTeam.team.sport.sportUuid);
    setMembersList(
      getTeam.team.members.map((member) => ({
        uuid: member.uuid,
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
              selectedValue={sportUuid}
              style={{ width: 200 }}
              onValueChange={(value) => {
                setSportUuid(value);
              }}
            >
              {sports.map(({ sportUuid, name }) => (
                <Picker.Item key={sportUuid} label={name} value={sportUuid} />
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
          {membersList.map(({ uuid, userImg, name, username }, index) => (
            <ListItem
              key={uuid}
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
            primary
            raised
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
