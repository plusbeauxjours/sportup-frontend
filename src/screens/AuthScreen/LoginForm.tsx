import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-apollo";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AsyncStorage } from "react-native";

import FormikInput from "../../components/Formik/FormikInput";
import Divider from "../../components/Divider";
import { LOGIN } from "./AuthScreenQueries";
import { Login, LoginVariables } from "../../types/api";

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

const LoginForm = ({ navigation }) => {
  const handleLoginComplete = async ({ tokenAuth }) => {
    const { token } = tokenAuth;
    await AsyncStorage.setItem("jwt", token);
    navigation.navigate("Main");
  };
  const [LoginFn, { client, loading: LoginLoading }] = useMutation<
    Login,
    LoginVariables
  >(LOGIN, {
    onCompleted: (tokenAuth) => handleLoginComplete(tokenAuth),
  });

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
        disabled={!isValid || LoginLoading}
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
      >
        Log in
      </Button>
      <Divider text="OR" />
      <Button
        disabled={LoginLoading}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        Create new account
      </Button>
    </React.Fragment>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
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
  );
};
export default LoginForm;
