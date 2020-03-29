import React, { Component } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Mutation, MutationFunction } from "react-apollo";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AsyncStorage } from "react-native";
import FormikInput from "../../components/Formik/FormikInput";
import styled from "styled-components";
import Divider from "../../components/Divider";
import { LOGIN } from "./AuthQueries";
import { Login, LoginVariables } from "../../types/api";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Button = styled.Button`
  margin-top: 10px;
  width: 90%;
`;
const Text = styled.Text``;

const initialValues = { username: "", password: "" };
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z0-9_]{1,15}$/,
      "Username can only contain alphabets, digits and underscores and has to be between 1 to 15 characters"
    )
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

export default class LoginForm extends Component<IProps> {
  public tokenAuth: MutationFunction;
  static navigationOptions = {
    title: "baeplay"
  };

  public handleLoginComplete = async ({ tokenAuth }) => {
    const { token } = tokenAuth;
    await AsyncStorage.setItem("token", token);
    this.props.navigation.navigate("Main");
  };

  public renderForm = ({
    values,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    isValid
  }) => (
    <React.Fragment>
      <FormikInput
        label="Username"
        autoCapitalize="none"
        value={values.username}
        onChange={setFieldValue}
        onTouch={setFieldTouched}
        name="username"
        error={touched.username && errors.username}
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
      <Mutation<Login, LoginVariables>
        mutation={LOGIN}
        variables={{ username: values.username, password: values.password }}
        onCompleted={this.handleLoginComplete}
      >
        {(tokenAuth, { loading, client }) => (
          <React.Fragment>
            <Button
              raised
              primary
              disabled={!isValid || loading}
              loading={loading}
              onPress={() => {
                client.resetStore();
                tokenAuth();
              }}
              title="Log in"
            />
            <Divider text="OR" />
            <Button
              disabled={loading}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
              title="Create new account"
            />
          </React.Fragment>
        )}
      </Mutation>
    </React.Fragment>
  );

  public render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center"
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
          render={this.renderForm}
        />
      </KeyboardAwareScrollView>
    );
  }
}
