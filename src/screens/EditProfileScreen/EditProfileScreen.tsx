import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import { ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-native-paper";
import { ReactNativeFile } from "apollo-upload-client";

import FormikInput from "../../components/Formik/FormikInput";
import FormikImagePicker from "../../components/FormikImagePicker";
import { UPDATE_USER } from "./EditProfileScreenQueries";
import Divider from "../../components/Divider";
import { ME } from "../MyProfileScreen/MyProfileScreenQueries";

// TODO: Handle navigation to CreateTeamScreen

export default class EditProfileScreen extends Component {
  static navigationOptions = {
    title: "Edit profile",
  };

  public onEditSportsPress = () => {
    this.props.navigation.navigate("EditSports");
  };

  public onCreateTeamPress = () => {
    this.props.navigation.navigate("CreateTeam");
  };

  public updateCache = (cache, { data: { updateUser } }) => {
    const { me } = cache.readQuery({ query: ME });
    cache.writeQuery({
      query: ME,
      data: {
        me: {
          ...me,
          user: {
            ...me.user,
            firstName: updateUser.user.firstName,
            lastName: updateUser.user.lastName,
            bio: updateUser.user.bio,
            userImg: updateUser.user.userImg,
          },
        },
      },
    });
  };

  public validationSchema = Yup.object().shape({
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

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          const { me } = client.readQuery({
            query: gql`
              {
                me {
                  user {
                    uuid
                    firstName
                    lastName
                    bio
                    userImg
                  }
                }
              }
            `,
          });

          return (
            <KeyboardAwareScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
            >
              <Formik
                initialValues={{
                  firstName: me.user.firstName,
                  lastName: me.user.lastName,
                  bio: me.user.bio,
                  password: "",
                  confirmPassword: "",
                  userImg: me.user.userImg && {
                    uri: me.user.userImg,
                  },
                }}
                onSubmit={() => {}}
                validationSchema={this.validationSchema}
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
                    <FormikImagePicker
                      initialImg={me.user.userImg && { uri: me.user.userImg }}
                      value={values.userImg}
                      onChoose={setFieldValue}
                      name="userImg"
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
                      error={touched.bio && errors.bio}
                    />
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
                    <Mutation
                      mutation={UPDATE_USER}
                      variables={{
                        firstName: values.firstName.trim(),
                        lastName: values.lastName.trim(),
                        bio: values.bio.trim(),
                        password: values.password,
                        userImg:
                          me.user.userImg === values.userImg
                            ? null
                            : new ReactNativeFile(values.userImg),
                      }}
                      update={this.updateCache}
                      onError={(error) => Alert.alert("", error.message)}
                    >
                      {(updateUserProfile, { loading }) => (
                        <React.Fragment>
                          <Button
                            raised
                            primary
                            disabled={!isValid || loading}
                            loading={loading}
                            onPress={() => {
                              updateUserProfile();
                              this.props.navigation.goBack();
                            }}
                            style={styles.button}
                          >
                            Save
                          </Button>
                          <Divider text="OR" />
                          <Button
                            disabled={loading}
                            onPress={this.onEditSportsPress}
                            style={styles.button}
                          >
                            Edit sports
                          </Button>
                          <Button
                            disabled={loading}
                            onPress={this.onCreateTeamPress}
                            style={styles.button}
                          >
                            Create team
                          </Button>
                        </React.Fragment>
                      )}
                    </Mutation>
                  </React.Fragment>
                )}
              </Formik>
            </KeyboardAwareScrollView>
          );
        }}
      </ApolloConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: { marginTop: 10, width: "90%" },
});
