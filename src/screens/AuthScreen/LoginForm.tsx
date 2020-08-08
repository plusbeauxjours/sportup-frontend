import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-apollo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { AsyncStorage, Platform } from "react-native";

import FormikInput from "../../components/Formik/FormikInput";
import Divider from "../../components/Divider";
import { LOGIN } from "./AuthScreenQueries";
import { Login, LoginVariables } from "../../types/api";
import Button from "../../components/Button";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";
import AppleApproach from "../AppleApproach/index";
import FacebookApproach from "../FacebookApproach";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

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
    .required("Password is required"),
});

const LoginForm: NavigationStackScreenComponent = () => {
  const navigation = useNavigation();
  const [LoginFn, { client, loading: LoginLoading }] = useMutation<
    Login,
    LoginVariables
  >(LOGIN, {
    onCompleted: (tokenAuth) => handleLoginComplete(tokenAuth),
  });

  const handleLoginComplete = async ({ tokenAuth }) => {
    const { token } = tokenAuth;
    await AsyncStorage.setItem("jwt", token);
    navigation.reset({
      index: 1,
      routes: [{ name: "MainDrawer" }],
    });
  };

  const renderForm = ({
    values,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    isValid,
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
      <Button
        disabled={!isValid || LoginLoading || values.username === ""}
        loading={LoginLoading}
        onPress={() => {
          client.resetStore();
          LoginFn({
            variables: {
              username: values.username,
              password: values.password,
            },
          });
        }}
        long={true}
        text={"Continue with Account"}
      />
      {Platform.OS === "ios" && <AppleApproach />}
      <FacebookApproach />
      <Divider text="OR" />
      <Button
        disabled={LoginLoading}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        long={true}
        text={"Create new account"}
      />
    </React.Fragment>
  );

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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {renderForm}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LoginForm;
