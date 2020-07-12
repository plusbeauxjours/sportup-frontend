import React from "react";
import { Picker, ActivityIndicator, Alert } from "react-native";
import { Divider } from "react-native-elements";
import { Mutation, useQuery, useMutation } from "react-apollo";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import * as Yup from "yup";
import moment from "moment";

import FormikInput from "../../components/Formik/FormikInput";
import FormikPicker from "../../components/Formik/FormikPicker";
import sports from "../../constants/sports";
import FormikDatePicker from "../../components/Formik/FormikDatePicker";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import { CREATE_EVENT } from "./CreateEventScreenQueries";
import {
  GetAllSports,
  CreateEvent,
  CreateEventVariables,
} from "../../types/api";

const TODAY = new Date();

const sportsList = sports.slice(1);

const initialValues = {
  name: "",
  description: "",
  sportId: "1",
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
  minimumMembers: 0,
  maximumMembers: 0,
  expectedTeamCount: 0,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required."),
  description: Yup.string(),
  sportId: Yup.string()
    .min(1)
    .max(sportsList.length)
    .required("Please select event sport."),
  startDate: Yup.string(),
  endDate: Yup.string(),
  startTime: Yup.string(),
  endTime: Yup.string(),
  minimumMembers: Yup.number()
    .typeError("This must be a number.")
    .required("This field is required."),
  maximumMembers: Yup.number()
    .typeError("This must be a number.")
    .required("This field is required."),
  expectedTeamCount: Yup.number().typeError("This must be a number."),
});

const CreateEventScreen = ({ navigation }) => {
  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);
  const [createEventFn, { loading: createEventLoading }] = useMutation<
    CreateEvent,
    CreateEventVariables
  >(CREATE_EVENT);
  if (getAllSportsLoading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
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
                label="Event name"
                value={values.name}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="name"
                error={touched.name && errors.name}
              />
              <FormikInput
                label="Event description (optional)"
                value={values.description}
                multiline={true}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="description"
                error={touched.description && errors.description}
              />
              <FormikPicker
                label="Event sport:"
                selectedValue={values.sportId}
                onChange={setFieldValue}
                name="sportId"
              >
                {sports?.map(({ sportId, name }) => (
                  <Picker.Item key={sportId} label={name} value={sportId} />
                ))}
              </FormikPicker>
              <Divider />
              <FormikDatePicker
                label="Event start date (optional):"
                date={values.startDate}
                mode="date"
                placeholder="Select date..."
                format="YYYY-MM-DD"
                minDate={TODAY}
                onChange={setFieldValue}
                name="startDate"
                // getDateStr={date => moment(date).format('DD MMM YYYY')}
              />
              <FormikDatePicker
                label="Event end date (optional):"
                date={values.endDate}
                mode="date"
                placeholder="Select date..."
                format="YYYY-MM-DD"
                minDate={values.startDate}
                onChange={setFieldValue}
                name="endDate"
                // getDateStr={date => moment(date).format('DD MMM YYYY')}
              />
              <FormikDatePicker
                label="Event starting time (optional):"
                date={values.startTime}
                mode="time"
                is24Hour={false}
                placeholder="Select time..."
                format="HH:mm"
                onChange={setFieldValue}
                name="startTime"
                getDateStr={(date) => moment(date).format("h:mm A")}
              />
              <FormikDatePicker
                label="Event ending time (optional):"
                date={values.endTime}
                mode="time"
                is24Hour={false}
                placeholder="Select time..."
                format="HH:mm"
                onChange={setFieldValue}
                name="endTime"
                getDateStr={(date) => moment(date).format("h:mm A")}
              />
              <Divider />
              <FormikInput
                label="Minimum team members"
                value={values.minimumMembers}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="minimumMembers"
                error={touched.minimumMembers && errors.minimumMembers}
                autoCorrect={false}
                keyboardType="phone-pad"
              />
              <FormikInput
                label="Maximum team members"
                value={values.maximumMembers}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="maximumMembers"
                error={touched.maximumMembers && errors.maximumMembers}
                autoCorrect={false}
                keyboardType="phone-pad"
              />
              <FormikInput
                label="Expected team count (optional)"
                value={values.expectedTeamCount}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="expectedTeamCount"
                error={touched.expectedTeamCount && errors.expectedTeamCount}
                autoCorrect={false}
                keyboardType="phone-pad"
              />
              <Mutation
                mutation={CREATE_EVENT}
                variables={{}}
                onError={(error) => {
                  Alert.alert("", error.message);
                }}
              >
                {(createTeam, mutationResult) => {
                  return (
                    <Button
                      loading={mutationResult.loading}
                      disabled={!isValid || mutationResult.loading}
                      onPress={() => {
                        createEventFn({
                          variables: {
                            name: values.name,
                            description: values.description,
                            sportId: values.sportId,
                            startDate: values.startDate,
                            endDate: values.endDate,
                            startTime: values.startTime,
                            endTime: values.endTime,
                            minimumMembers: values.minimumMembers,
                            maximumMembers: values.maximumMembers,
                            expectedTeams: values.expectedTeamCount,
                          },
                        });
                        navigation.goBack();
                      }}
                      style={{
                        marginTop: 10,
                        width: "90%",
                        alignSelf: "center",
                      }}
                    >
                      Create
                    </Button>
                  );
                }}
              </Mutation>
            </React.Fragment>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }
};

export default CreateEventScreen;
