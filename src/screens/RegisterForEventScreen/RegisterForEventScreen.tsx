import React, { PureComponent } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import { Mutation } from "react-apollo";
import FormikInput from "../../components/Formik/FormikInput";
import { REGISTER_TEAM } from "./RegisterForEventScreenQueries";

export default class RegisterForEventScreen extends PureComponent {
  static navigationOptions = {
    title: "Register",
  };

  constructor(props) {
    super(props);

    this.maximumMembers = this.props.navigation.getParam("maximumMembers");
    this.minimumMembers = this.props.navigation.getParam("minimumMembers");
    this.validationSchema = {
      teamName: Yup.string().required("Team's name is required."),
      captainName: Yup.string().required("Captain's name is required."),
      captainCnic: Yup.string().required("Captain's CNIC is required."),
      captainContact: Yup.string().required(
        "Captain's contact number is required."
      ),
    };

    this.initialValues = {
      teamName: "",
      captainName: "",
      captainCnic: "",
      captainContact: "",
    };

    for (let i = 1; i < this.maximumMembers; i += 1) {
      this.initialValues[`player${i}Name`] = "";
      if (i < this.minimumMembers) {
        this.validationSchema[`player${i}Name`] = Yup.string().required(
          `Player ${i} is required.`
        );
      } else {
        this.validationSchema[`player${i}Name`] = Yup.string();
      }
    }
  }

  // generateInputs = ({
  //   values,
  //   setFieldValue,
  //   setFieldTouched,
  //   touched,
  //   errors,
  // }) => {
  //   const inputs = [];

  //   for (let i = 1; i < this.maximumMembers; i += 1) {
  //     inputs.push(
  //       <FormikInput
  //         label={`Player ${i} name`}
  //         value={values.captainName}
  //         onChange={setFieldValue}
  //         onTouch={setFieldTouched}
  //         name="captainName"
  //         error={touched.captainName && errors.captainName}
  //       />,
  //     );
  //   }
  // };

  render() {
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
          initialValues={this.initialValues}
          onSubmit={() => {}}
          validationSchema={Yup.object().shape(this.validationSchema)}
          render={({
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
                label="Captain's CNIC"
                value={values.captainCnic}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="captainCnic"
                error={touched.captainCnic && errors.captainCnic}
              />
              <FormikInput
                label="Captain's contact number"
                value={values.captainContact}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="captainContact"
                error={touched.captainContact && errors.captainContact}
              />
              {Object.keys(this.initialValues)
                .slice(4)
                .map((field, index) => (
                  <FormikInput
                    label={`Player ${index + 1} name${
                      index >= this.minimumMembers - 1 ? " (optional)" : ""
                    }`}
                    value={values[field]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    name={field}
                    error={touched[field] && errors[field]}
                    key={index}
                  />
                ))}
              <Mutation
                mutation={REGISTER_TEAM}
                variables={{
                  eventId: this.props.navigation.getParam("eventId"),
                  teamName: values.teamName,
                  captainName: values.captainName,
                  captainCnic: values.captainCnic,
                  captainContact: values.captainContact,
                  playerNames: Object.keys(this.initialValues)
                    .slice(4)
                    .map((field) => values[field])
                    .filter((field) => values[field] != ""),
                }}
                onError={(error) => {
                  Alert.alert("", error.message);
                }}
              >
                {(registerTeam, { loading }) => (
                  <Button
                    disabled={!isValid || loading}
                    loading={loading}
                    style={{ marginTop: 10, width: "90%" }}
                    onPress={() => {
                      registerTeam();
                      this.props.navigation.goBack();
                    }}
                  >
                    Register
                  </Button>
                )}
              </Mutation>
            </React.Fragment>
          )}
        />
      </KeyboardAwareScrollView>
    );
  }
}
