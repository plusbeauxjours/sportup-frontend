import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery, ApolloConsumer } from "react-apollo";
import { Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Divider } from "react-native-paper";
import styled from "styled-components/native";
import { Formik } from "formik";
import * as Yup from "yup";

import { UpdateTeam, UpdateTeamVariables } from "../../types/api";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_USER_FROM_USERNAME } from "../CreateTeamScreen/CreateTeamScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import { GET_TEAM } from "../TeamProfileScreen/TeamProfileScreenQueries";
import { UPDATE_TEAM } from "./EditTeamProfileScreenQueries";
import {
  GetAllSports,
  GetTeam,
  GetTeamVariables,
  GetSearchResults,
  GetSearchResultsVariables,
} from "../../types/api";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";
import { GET_SEARCH_RESULTS } from "../SearchScreen/SearchQueries";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Loader from "../../components/Loader";
import { DARK_ORANGE, PRIMARY_COLOR } from "../../constants/colors";
import FormikInput from "../../components/Formik/FormikInput";
import FormikPicker from "../../components/Formik/FormikPicker";
import { Ionicons } from "@expo/vector-icons";
import utils from "../../utils/utils";
import { useMe } from "../../context/meContext";

const OuterUserInfoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 100%;
`;
const InnerUserInfoContainerStyle = styled.View`
  justify-content: center;
  padding: 0 10px 0 10px;
`;
const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 40px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TextInputContainer = styled.View`
  width: 90%;
  align-self: center;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const EditTeamProfileScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const isAndroid = utils.isAndroid();
  const team = navigation.getParam("team");
  const { me, loading: meLoading } = useMe();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [membersList, setMembersList] = useState<any>(team.members);
  const [searchText, setSearchText] = useState<string>("");
  const [
    search,
    { data: { getSearchUsers: { users = null } = {} } = {}, loading },
  ] = useLazyQuery<GetSearchResults, GetSearchResultsVariables>(
    GET_SEARCH_RESULTS,
    { variables: { searchText } }
  );

  const validationSchema = Yup.object().shape({
    teamName: Yup.string().required("Team name is required"),
  });

  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);

  const [updateTeamFn, { loading: updateTeamLoading }] = useMutation<
    UpdateTeam,
    UpdateTeamVariables
  >(UPDATE_TEAM, {
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

  const onAddPress = async (client, username) => {
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

  const removeMember = (id) => {
    setMembersList((membersList) =>
      membersList.filter((member) => member.id !== id)
    );
  };

  const onPress = (userId) => {
    me?.user?.id === userId
      ? navigation.navigate("MyProfileScreen")
      : navigation.navigate("UserProfileScreen", { userId });
  };

  useEffect(() => {
    search();
  }, [searchText]);

  if (getAllSportsLoading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{
              teamName: team.teamName,
              username: "",
              sportId: team.sport.sportId,
            }}
            onSubmit={() => {}}
            validationSchema={validationSchema}
          >
            {({
              values,
              setFieldValue,
              setFieldTouched,
              touched,
              errors,
              isValid,
            }) => (
              <React.Fragment>
                <WhiteSpace />
                <FormikInput
                  label="Team name"
                  value={values.teamName}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="teamName"
                  autoCapitalize="none"
                  error={touched.teamName && errors.teamName}
                />
                <FormikPicker
                  label="Team sport:"
                  selectedValue={values.sportId}
                  onChange={setFieldValue}
                  name="sportId"
                >
                  {sports.map(({ sportId, name }) => (
                    <Picker.Item key={sportId} label={name} value={sportId} />
                  ))}
                </FormikPicker>
                {membersList.map(({ id, userImg, name, username }, index) => (
                  <TouchableOpacity key={index} onPress={() => onPress(id)}>
                    <OuterUserInfoContainerStyle>
                      <Avatar
                        rounded
                        source={{
                          uri: userImg
                            ? MEDIA_URL + userImg
                            : NO_AVATAR_THUMBNAIL,
                        }}
                      />
                      <InnerUserInfoContainerStyle>
                        <NameText>{name}</NameText>
                        <Caption>{`@${username}`}</Caption>
                      </InnerUserInfoContainerStyle>
                      <IconContainer
                        onPress={() => {
                          removeMember(id);
                        }}
                      >
                        <Ionicons
                          name={
                            isAndroid
                              ? "md-close-circle-outline"
                              : "ios-close-circle-outline"
                          }
                          size={24}
                          color={PRIMARY_COLOR}
                        />
                      </IconContainer>
                    </OuterUserInfoContainerStyle>
                  </TouchableOpacity>
                ))}
                <ButtonContainer>
                  <Button
                    loading={updateTeamLoading}
                    disabled={
                      !isValid ||
                      userLoading ||
                      !values.teamName ||
                      updateTeamLoading
                    }
                    onPress={() => {
                      updateTeamFn({
                        variables: {
                          teamId: team.id,
                          teamName: values.teamName,
                          sportId: values.sportId,
                          memberIds: membersList.map(({ id }) => id),
                        },
                      });
                      navigation.navigate("MyProfileScreen");
                    }}
                    text={"Save"}
                  />
                </ButtonContainer>
                <WhiteSpace />
                <Divider />
                <WhiteSpace />
                <TextInputContainer>
                  <TextInput
                    label="Search user"
                    value={searchText}
                    onChangeText={(text: string) => {
                      setSearchText(text);
                    }}
                    style={{ backgroundColor: "transparent" }}
                    theme={{ colors: { primary: DARK_ORANGE } }}
                    autoCapitalize="none"
                  />
                </TextInputContainer>
                <ApolloConsumer>
                  {(client) => (
                    <>
                      {users?.map(({ id, userImg, name, username }, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => onPress(id)}
                          >
                            <OuterUserInfoContainerStyle>
                              <Avatar
                                rounded
                                source={{
                                  uri: userImg
                                    ? MEDIA_URL + userImg
                                    : NO_AVATAR_THUMBNAIL,
                                }}
                              />
                              <InnerUserInfoContainerStyle>
                                <NameText>{name}</NameText>
                                <Caption>{`@${username}`}</Caption>
                              </InnerUserInfoContainerStyle>
                              <IconContainer
                                onPress={() => {
                                  setSearchText("");
                                  onAddPress(client, username);
                                }}
                              >
                                <Ionicons
                                  name={
                                    isAndroid
                                      ? "md-add-circle-outline"
                                      : "ios-add-circle-outline"
                                  }
                                  size={24}
                                  color={PRIMARY_COLOR}
                                />
                              </IconContainer>
                            </OuterUserInfoContainerStyle>
                          </TouchableOpacity>
                        );
                      })}
                      <WhiteSpace />
                    </>
                  )}
                </ApolloConsumer>
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
};
EditTeamProfileScreen.navigationOptions = {
  title: "Edit Team",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default EditTeamProfileScreen;
