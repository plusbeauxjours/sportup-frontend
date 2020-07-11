import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

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
        console.log("mkokoko");
        navigation.navigate("UpcomingEventScreen");
      }}
    >
      Browse Upcoming Events
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      onPress={() => {
        navigation.navigate("CreateEventScreen");
      }}
    >
      Create Event
    </Button>
    <Button icon="contact-mail" style={{ marginBottom: 10 }}>
      Contact Us
    </Button>
  </Container>
);

export default MainTournamentScreen;
