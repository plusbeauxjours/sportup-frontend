import React from "react";
import { Avatar } from "react-native-elements";
import { useMutation, useQuery } from "react-apollo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import FormikInput from "../../components/Formik/FormikInput";
import { UPDATE_USER } from "./EditProfileScreenQueries";
import Divider from "../../components/Divider";
import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";

import { UpdateUser, UpdateUserVariables, Me } from "../../types/api";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";

const WhiteSpace = styled.View`
  height: 50px;
`;
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const EditProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const {
    data: { me: { user = null } = {} } = {},
    loading: meLoading,
  } = useQuery<Me>(ME);

  const [updateUserFn, { loading: updateUserLoading }] = useMutation<
    UpdateUser,
    UpdateUserVariables
  >(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      try {
        const { me } = cache.readQuery<Me>({ query: ME });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: {
                ...me?.user,
                name:
                  updateUser.user.firstName + " " + updateUser.user.lastName,
                firstName: updateUser.user.firstName,
                lastName: updateUser.user.lastName,
                bio: updateUser.user.bio,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const onEditSportsPress = () => {
    navigation.navigate("EditSportsScreen");
  };

  const onCreateTeamPress = () => {
    navigation.navigate("CreateTeamScreen");
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    bio: Yup.string(),
    password: Yup.lazy((value) =>
      !value
        ? Yup.string()
        : Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    ),
  });
  if (meLoading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{
              firstName: user?.firstName,
              lastName: user?.lastName,
              bio: user?.bio,
              password: "",
              confirmPassword: "",
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
                <Avatar
                  size="large"
                  rounded
                  containerStyle={{ marginVertical: 40 }}
                  source={{
                    uri: user?.userImg
                      ? MEDIA_URL + user?.userImg
                      : NO_AVATAR_THUMBNAIL,
                  }}
                />
                <FormikInput
                  label="First name"
                  value={values.firstName}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="firstName"
                  error={touched.firstName && errors.firstName}
                />
                <FormikInput
                  label="Last name"
                  value={values.lastName}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="lastName"
                  error={touched.lastName && errors.lastName}
                />
                <FormikInput
                  label="Bio"
                  value={values.bio}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="bio"
                  multiline={true}
                  error={touched.bio && errors.bio}
                />
                {!user.fbId && !user.appleId && (
                  <>
                    <FormikInput
                      label="Password"
                      autoCapitalize="none"
                      secureTextEntry
                      value={values.password}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="password"
                      error={touched.password && errors.password}
                    />
                    <FormikInput
                      label="Confirm password"
                      autoCapitalize="none"
                      secureTextEntry
                      value={values.confirmPassword}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="confirmPassword"
                      error={touched.confirmPassword && errors.confirmPassword}
                    />
                  </>
                )}
                <WhiteSpace />
                <Button
                  disabled={!isValid || updateUserLoading}
                  loading={updateUserLoading}
                  onPress={() => {
                    updateUserFn({
                      variables: {
                        firstName: values.firstName.trim(),
                        lastName: values.lastName.trim(),
                        bio: values.bio.trim(),
                        password: values.password,
                      },
                    });
                    navigation.goBack();
                  }}
                  text={"Save"}
                />
                <Divider text="OR" />
                <Button
                  disabled={updateUserLoading}
                  onPress={onEditSportsPress}
                  text={"Edit sports"}
                  long={true}
                />
                <Button
                  disabled={updateUserLoading}
                  onPress={onCreateTeamPress}
                  text={"Create team"}
                  long={true}
                />
                <WhiteSpace />
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
};

EditProfileScreen.navigationOptions = {
  title: "Edit profile",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default EditProfileScreen;
