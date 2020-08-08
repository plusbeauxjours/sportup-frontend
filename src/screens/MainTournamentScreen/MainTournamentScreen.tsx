import React from "react";
import styled from "styled-components/native";

import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainTournamentScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
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
};

export default MainTournamentScreen;
