import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-apollo";

import { REGISTER_TEAM } from "./RegisterForEventScreenQueries";
import { RegisterTeam, RegisterTeamVariables } from "../../types/api";
import FormikInput from "../../components/Formik/FormikInput";
import Button from "../../components/Button";

const RegisterForEventScreen = ({ navigation }) => {
  const eventId = navigation.getParam("eventId");
  const maximumMembers = navigation.getParam("maximumMembers");
  const minimumMembers = navigation.getParam("minimumMembers");
  const [registerTeamFn, { loading: registerTeamLoading }] = useMutation<
    RegisterTeam,
    RegisterTeamVariables
  >(REGISTER_TEAM);

  const validationSchema = {
    teamName: Yup.string().required("Team's name is required."),
    captainName: Yup.string().required("Captain's name is required."),
    captainContact: Yup.string().required(
      "Captain's contact number is required."
    ),
  };

  let initialValues = {
    teamName: "",
    captainName: "",
    captainContact: "",
  };

  for (let i = 1; i < maximumMembers; i += 1) {
    initialValues[`player${i}Name`] = "";
    if (i < minimumMembers) {
      validationSchema[`player${i}Name`] = Yup.string().required(
        `Player ${i} is required.`
      );
    } else {
      validationSchema[`player${i}Name`] = Yup.string();
    }
  }

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
        onSubmit={() => {}}
        validationSchema={Yup.object().shape(validationSchema)}
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
            <FormikInput
              label="Team's name"
              value={values.teamName}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name="teamName"
              error={touched.teamName && errors.teamName}
            />
            <FormikInput
              label="Captain's name"
              value={values.captainName}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name="captainName"
              error={touched.captainName && errors.captainName}
            />
            <FormikInput
              label="Captain's contact number"
              value={values.captainContact}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name="captainContact"
              error={touched.captainContact && errors.captainContact}
            />

            {Object.keys(initialValues)
              .slice(3)
              .map((field, index) => (
                <>
                  <FormikInput
                    label={`Player ${index + 1} name${
                      index >= minimumMembers - 1 ? " (optional)" : ""
                    }`}
                    value={values[field]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    name={field}
                    error={touched[field] && errors[field]}
                    key={index}
                  />
                </>
              ))}
            <Button
              disabled={
                !isValid || registerTeamLoading || values.teamName === ""
              }
              loading={registerTeamLoading}
              onPress={() => {
                registerTeamFn({
                  variables: {
                    eventId,
                    teamName: values.teamName,
                    captainName: values.captainName,
                    captainContact: values.captainContact,
                    playerNames: Object.keys(initialValues)
                      .slice(4)
                      .map((field) => values[field])
                      .filter((field) => values[field] != ""),
                  },
                });
                navigation.goBack();
              }}
            >
              Register
            </Button>
          </React.Fragment>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};
RegisterForEventScreen.navigationOptions = ({ navigation }) => ({
  title: "Register For Event",
});
export default RegisterForEventScreen;
