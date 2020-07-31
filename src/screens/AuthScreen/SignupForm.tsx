import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-apollo";
import { AsyncStorage } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormikInput from "../../components/Formik/FormikInput";
import { LOGIN, SIGNUP } from "./AuthScreenQueries";
import {
  Login,
  LoginVariables,
  Signup,
  SignupVariables,
} from "../../types/api";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  handle: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  handle: Yup.string()
    .matches(
      /^[A-Za-z0-9_]{1,15}$/,
      "Username can only contain alphabets, digits and underscores and has to be between 1 to 15 characters"
    )
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password" ? "password" : null)], "Passwords do not match")
    .required("Please re-enter your password"),
});

const SignupForm = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [LoginFn, { client: LoginClient, loading: LoginLoading }] = useMutation<
    Login,
    LoginVariables
  >(LOGIN, {
    onCompleted: (tokenAuth) => handleLoginComplete(tokenAuth),
  });

  const [SignupFn, { loading: SignupLoading }] = useMutation<
    Signup,
    SignupVariables
  >(SIGNUP, {
    onCompleted: () => {
      LoginClient.resetStore(), LoginFn({ variables: { username, password } });
    },
  });

  const handleLoginComplete = async ({ tokenAuth }) => {
    const { token } = tokenAuth;
    await AsyncStorage.setItem("jwt", token);
    navigation.navigate("Main");
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
        label="First Name"
        value={values.firstName}
        onChange={setFieldValue}
        onTouch={setFieldTouched}
        name="firstName"
        error={touched.firstName && errors.firstName}
      />
      <FormikInput
        label="Last Name"
        value={values.lastName}
        onChange={setFieldValue}
        onTouch={setFieldTouched}
        name="lastName"
        error={touched.lastName && errors.lastName}
      />
      <FormikInput
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={values.email}
        onChange={setFieldValue}
        onTouch={setFieldTouched}
        name="email"
        error={touched.email && errors.email}
      />
      <FormikInput
        label="Username"
        autoCapitalize="none"
        value={values.handle}
        onChange={setFieldValue}
        onTouch={setFieldTouched}
        name="handle"
        error={touched.handle && errors.handle}
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
      <Button
        disabled={!isValid || LoginLoading || SignupLoading}
        loading={LoginLoading || SignupLoading}
        onPress={() => {
          SignupFn({
            variables: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              username: values.handle,
              password: values.password,
            },
          });
          setUsername(values.handle);
          setPassword(values.password);
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
          onSubmit={() => {}}
          validationSchema={validationSchema}
        >
          {renderForm}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};
SignupForm.navigationOptions = ({ navigation }) => ({
  title: "Sign Up",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
});

export default SignupForm;
