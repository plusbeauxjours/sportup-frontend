import React, { useState } from "react";
import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { GET_USER_FROM_USERNAME, CREATE_TEAM } from "./CreateTeamScreenQueries";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Subheading } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { ApolloConsumer, useMutation } from "react-apollo";
import styled from "styled-components/native";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { Me } from "../../types/api";
import { GetAllSports, CreateTeam, CreateTeamVariables } from "../../types/api";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CreateTeamScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [teamName, setTeamName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [sportId, setSportId] = useState<string>("1");
  const [membersList, setMembersList] = useState<any>([]);
  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);
  const [createTeamFn, { loading: createTeamLoading }] = useMutation<
    CreateTeam,
    CreateTeamVariables
  >(CREATE_TEAM, {
    variables: {
      teamName,
      sportId,
      memberIds: membersList.map(({ id }) => id),
    },
    update(cache, { data: { createTeam } }) {
      try {
        const { me } = cache.readQuery<Me>({
          query: ME,
        });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: { ...me?.user, teamsCount: me?.user.teamsCount + 1 },
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
  if (getAllSportsLoading) {
    return <Loader />;
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
                text={"Add"}
              />
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
            loading={createTeamLoading}
            disabled={userLoading || !teamName || createTeamLoading}
            onPress={() => {
              createTeamFn();
              navigation.goBack();
            }}
            style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
            text={"Save"}
          />
        </React.Fragment>
      </KeyboardAwareScrollView>
    );
  }
};
CreateTeamScreen.navigationOptions = {
  title: "Create Team",
};

export default CreateTeamScreen;
