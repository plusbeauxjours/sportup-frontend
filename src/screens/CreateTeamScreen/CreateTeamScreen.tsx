import React, { useState, useEffect } from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { GET_USER_FROM_USERNAME, CREATE_TEAM } from "./CreateTeamScreenQueries";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Subheading, Divider, TextInput, Caption } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { Picker } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { ApolloConsumer, useMutation, useLazyQuery } from "react-apollo";
import styled from "styled-components/native";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Me,
  GetSearchResults,
  GetSearchResultsVariables,
} from "../../types/api";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GetAllSports, CreateTeam, CreateTeamVariables } from "../../types/api";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import FormikInput from "../../components/Formik/FormikInput";
import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { GET_SEARCH_RESULTS } from "../SearchScreen/SearchQueries";
import { DARK_ORANGE } from "../../constants/colors";
import BackBtn from "../../components/BackBtn";
import FormikPicker from "../../components/Formik/FormikPicker";

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

const PickerContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 50px;
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
const ImageView = styled.View``;

const CreateTeamScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [membersList, setMembersList] = useState<any>([]);
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
  const [createTeamFn, { loading: createTeamLoading }] = useMutation<
    CreateTeam,
    CreateTeamVariables
  >(CREATE_TEAM, {
    update(cache) {
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
              teamName: "",
              username: "",
              sportId: "1",
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
                <ImageView>
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
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        removeMember(id);
                      }}
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
                          <Subheading>{name}</Subheading>
                          <Caption>{`@${username}`}</Caption>
                        </InnerUserInfoContainerStyle>
                      </OuterUserInfoContainerStyle>
                    </TouchableOpacity>
                  ))}
                  <ButtonContainer>
                    <Button
                      loading={createTeamLoading}
                      disabled={
                        !isValid ||
                        userLoading ||
                        !values.teamName ||
                        createTeamLoading
                      }
                      onPress={() => {
                        createTeamFn({
                          variables: {
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
                </ImageView>
                <Divider />
                <WhiteSpace />
                <TextInputContainer>
                  <TextInput
                    label="Search user"
                    value={searchText}
                    onChangeText={(text: string) => {
                      setSearchText(text), console.log(searchText);
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
                            onPress={() => {
                              setSearchText("");
                              onAddPress(client, username);
                            }}
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
                                <Subheading>{name}</Subheading>
                                <Caption>{`@${username}`}</Caption>
                              </InnerUserInfoContainerStyle>
                            </OuterUserInfoContainerStyle>
                          </TouchableOpacity>
                        );
                      })}
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
CreateTeamScreen.navigationOptions = {
  title: "Create Team",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default CreateTeamScreen;
