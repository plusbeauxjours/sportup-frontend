import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { ListItem } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Subheading, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import {
  UpdateTeam,
  UpdateTeamVariables,
  GetUserFromUsername,
  GetUserFromUsernameVariables,
} from "../../types/api";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_USER_FROM_USERNAME } from "../CreateTeamScreen/CreateTeamScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import { GET_TEAM } from "../TeamProfileScreen/TeamProfileScreenQueries";
import { UPDATE_TEAM } from "./EditTeamProfileScreenQueries";
import { GetAllSports, GetTeam, GetTeamVariables } from "../../types/api";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditTeamProfileScreen = ({ navigation }) => {
  const team = navigation.getParam("team");
  const [teamName, setTeamName] = useState<string>(team?.teamName || "");
  const [sportId, setSportId] = useState<string>(team?.sport?.sportId || "1");
  const [membersList, setMembersList] = useState<any>(team?.members || []);
  const [addUser, setAddUser] = useState<string>("");
  const {
    data: { getUserFromUsername: { user = null } = {} } = {},
    loading: getUserFromUsernameLoading,
  } = useQuery<GetUserFromUsername, GetUserFromUsernameVariables>(
    GET_USER_FROM_USERNAME,
    { variables: { username: addUser.trim() } }
  );
  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);
  const [updateTeamFn, { loading: updateTeamLoading }] = useMutation<
    UpdateTeam,
    UpdateTeamVariables
  >(UPDATE_TEAM, {
    variables: {
      teamId: team.id,
      teamName,
      sportId,
      memberIds: membersList.map(({ id }) => parseInt(id, 10)),
    },
    update(cache, { data: { updateTeam } }) {
      try {
        const data = cache.readQuery<GetTeam, GetTeamVariables>({
          query: GET_TEAM,
          variables: { teamId: team.id },
        });
        if (data) {
          cache.writeQuery({
            query: GET_TEAM,
            data: {
              ...data,
              getTeam: {
                ...data.getTeam,
                team: {
                  ...data.getTeam.team,
                  teamName: updateTeam.team.teamName,
                  coverImg: updateTeam.team.coverImg,
                  sport: updateTeam.team.sport,
                  members: updateTeam.team.members,
                },
              },
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  const onUserFetched = (user) => {
    setMembersList([...membersList, user]);
  };

  const onAddPress = async () => {
    onUserFetched(user);
  };

  const removeMember = (index) => {
    setMembersList(membersList.filter((_, idx) => idx !== index));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
      keyboardShouldPersistTaps="handled"
    >
      <React.Fragment>
        <TextInput
          label="Team name"
          value={teamName}
          onChangeText={(teamName) => {
            setTeamName(teamName);
          }}
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
            {sports?.map(({ sportId, name }) => (
              <Picker.Item key={sportId} label={name} value={sportId} />
            ))}
          </Picker>
        </PickerContainer>
        <TextInput
          label="Add member"
          placeholder="Enter username..."
          autoCapitalize="none"
          value={addUser}
          onChangeText={(username) => setAddUser(username)}
          style={{ width: "90%", alignSelf: "center" }}
        />
        <Button
          loading={getUserFromUsernameLoading}
          disabled={getUserFromUsernameLoading || !addUser}
          onPress={() => {
            onAddPress();
          }}
          text={"Add"}
        />
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
          disabled={
            getUserFromUsernameLoading || !teamName || updateTeamLoading
          }
          onPress={() => {
            updateTeamFn();
            navigation.goBack();
          }}
          text={"Save"}
        />
      </React.Fragment>
    </KeyboardAwareScrollView>
  );
};
EditTeamProfileScreen.navigationOptions = {
  title: "Edit Team",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default EditTeamProfileScreen;
