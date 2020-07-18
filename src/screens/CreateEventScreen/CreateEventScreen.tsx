import React, { useState } from "react";
import Moment from "moment";
import { Picker } from "react-native";
import { Divider } from "react-native-elements";
import { useQuery, useMutation } from "react-apollo";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import * as Yup from "yup";
import DatePickerModal from "react-native-modal-datetime-picker";

import FormikInput from "../../components/Formik/FormikInput";
import FormikPicker from "../../components/Formik/FormikPicker";
import sports from "../../constants/sports";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import { CREATE_EVENT } from "./CreateEventScreenQueries";
import styled from "styled-components/native";
import { formatDate, formatTime } from "../../utils/time";
import Loader from "../../components/Loader";
import {
  GetAllSports,
  CreateEvent,
  CreateEventVariables,
} from "../../types/api";

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

const Touchable = styled.TouchableOpacity``;

const Date = styled.Text`
  font-size: 24px;
  color: #000;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #999;
  color: #999;
  border-radius: 5px;
  background-color: #fff;
`;

const CreateEventScreen = ({ navigation }) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [startDateModalOpen, setStartDateModalOpen] = useState<any>(null);
  const [endDateModalOpen, setEndDateModalOpen] = useState<any>(null);
  const [startTimeModalOpen, setStartTimeModalOpen] = useState<any>(null);
  const [endTimeModalOpen, setEndTimeModalOpen] = useState<any>(null);

  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS);

  const [createEventFn, { loading: createEventLoading }] = useMutation<
    CreateEvent,
    CreateEventVariables
  >(CREATE_EVENT);

  if (getAllSportsLoading) {
    return <Loader />;
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
              <DatePickerModal
                headerTextIOS={"날짜를 선택하세요."}
                cancelTextIOS={"취소"}
                confirmTextIOS={"확인"}
                isVisible={startDateModalOpen}
                mode="date"
                locale="us_EN"
                onConfirm={(date) => {
                  setStartDate(date), setStartDateModalOpen(false);
                }}
                onCancel={() => setStartDateModalOpen(false)}
                display="default"
              />
              <DatePickerModal
                headerTextIOS={"날짜를 선택하세요."}
                cancelTextIOS={"취소"}
                confirmTextIOS={"확인"}
                isVisible={endDateModalOpen}
                mode="date"
                locale="us_EN"
                onConfirm={(date) => {
                  setEndDate(date), setEndDateModalOpen(false);
                }}
                onCancel={() => setEndDateModalOpen(false)}
                display="default"
              />
              <DatePickerModal
                headerTextIOS={"날짜를 선택하세요."}
                cancelTextIOS={"취소"}
                confirmTextIOS={"확인"}
                isVisible={startTimeModalOpen}
                mode="time"
                locale="us_EN"
                onConfirm={(time) => {
                  setStartTime(time), setStartTimeModalOpen(false);
                }}
                onCancel={() => setStartTimeModalOpen(false)}
                display="default"
              />
              <DatePickerModal
                headerTextIOS={"날짜를 선택하세요."}
                cancelTextIOS={"취소"}
                confirmTextIOS={"확인"}
                isVisible={endTimeModalOpen}
                mode="time"
                locale="us_EN"
                onConfirm={(time) => {
                  setEndTime(time), setEndTimeModalOpen(false);
                }}
                onCancel={() => setEndTimeModalOpen(false)}
                display="default"
              />
              <Divider />
              <Touchable onPress={() => setStartDateModalOpen(true)}>
                <Date>
                  {startDate
                    ? formatDate(startDate)
                    : "Event start date (optional):"}
                </Date>
              </Touchable>
              <Touchable onPress={() => setEndDateModalOpen(true)}>
                <Date>
                  {endDate ? formatDate(endDate) : "Event end date (optional):"}
                </Date>
              </Touchable>
              <Touchable onPress={() => setStartTimeModalOpen(true)}>
                <Date>
                  {startTime
                    ? formatTime(startTime)
                    : "Event starting time (optional):"}
                </Date>
              </Touchable>
              <Touchable onPress={() => setEndTimeModalOpen(true)}>
                <Date>
                  {endTime
                    ? formatTime(endTime)
                    : "Event ending time (optional):"}
                </Date>
              </Touchable>
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
              <Button
                loading={createEventLoading}
                disabled={!isValid || createEventLoading}
                onPress={() => {
                  createEventFn({
                    variables: {
                      name: values.name,
                      description: values.description,
                      sportId: values.sportId,
                      startDate: Moment(startDate).format("YYYY-MM-DD"),
                      endDate: Moment(endDate).format("YYYY-MM-DD"),
                      startTime: Moment(startTime).format("HH:MM"),
                      endTime: Moment(endTime).format("HH:MM"),
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
            </React.Fragment>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }
};
CreateEventScreen.navigationOptions = ({ navigation }) => ({
  title: "Create Events",
});
export default CreateEventScreen;
