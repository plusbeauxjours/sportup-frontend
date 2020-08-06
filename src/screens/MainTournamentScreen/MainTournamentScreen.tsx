import React from "react";
import { Appbar } from "react-native-paper";
import styled from "styled-components/native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import Button from "../../components/Button";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainTournamentScreen: NavigationStackScreenComponent = ({
  navigation,
}) => (
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

export default MainTournamentScreen;
