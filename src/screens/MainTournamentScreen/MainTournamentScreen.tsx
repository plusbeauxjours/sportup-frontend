import React from "react";
import { Appbar } from "react-native-paper";
import styled from "styled-components/native";
import Button from "../../components/Button";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainTournamentScreen = ({ navigation }) => (
  <Container>
    <Button
      style={{ marginBottom: 10 }}
      onPress={() => {
        navigation.navigate("UpcomingEventScreen");
      }}
      text={"Browse Upcoming Events"}
    />
    <Button
      style={{ marginBottom: 10 }}
      onPress={() => {
        navigation.navigate("CreateEventScreen");
      }}
      text={"Create Event"}
    />
  </Container>
);
MainTournamentScreen.navigationOptions = ({ navigation }) => ({
  title: "Events",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});
export default MainTournamentScreen;
