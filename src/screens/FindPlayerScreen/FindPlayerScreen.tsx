import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { useQuery } from "react-apollo";
import styled from "styled-components/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GET_ALL_SPORTS } from "./FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";
import { GetAllSports } from "../../types/api";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FindPlayerScreen = ({ navigation }) => {
  const [selectedSportIds, setSelectedSportsIds] = useState<any>([]);

  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS, { fetchPolicy: "network-only" });

  const onFindPlayerPress = () => {
    navigation.navigate("FoundPlayersListScreen", {
      selectedSportIds,
    });
  };

  const onFindTeamPress = () => {
    navigation.navigate("FoundTeamsListScreen", {
      selectedSportIds,
    });
  };

  const toggleSportChip = (sportId: string) => {
    if (selectedSportIds.includes(sportId)) {
      setSelectedSportsIds(selectedSportIds.filter((i) => i !== sportId));
    } else {
      setSelectedSportsIds((i) => [...i, sportId]);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Row>
          {sports?.map((sport) => (
            <RatingChip
              sportId={sport.sportId}
              name={sport.name}
              selected={selectedSportIds.includes(sport.sportId)}
              key={sport.sportId}
              onChipPress={() => toggleSportChip(sport.sportId)}
            />
          ))}
        </Row>
        <Container>
          <Button onPress={onFindTeamPress} style={{ flex: 1 }}>
            Find A Team
          </Button>
          <Button onPress={onFindPlayerPress} style={{ flex: 1 }}>
            Find A Player
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
};
FindPlayerScreen.navigationOptions = ({ navigation }) => ({
  title: "Play",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});
export default FindPlayerScreen;
