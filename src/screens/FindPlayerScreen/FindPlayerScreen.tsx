import React, { useState } from "react";
import { useQuery } from "react-apollo";
import styled from "styled-components/native";

import { GET_ALL_SPORTS } from "./FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";
import { GetAllSports } from "../../types/api";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Row = styled.View`
  max-width: 900px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const IconContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.Image`
  bottom: -20px;
  width: 100px;
  height: 75px;
  z-index: 5;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const FindPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
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
    return <Loader />;
  } else {
    return (
      <Container>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
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
          <WhiteSpace />
          <Row>
            <IconContainer>
              <TouchableWithoutFeedback onPress={onFindTeamPress}>
                <Image source={require("../../../assets/icon/teamIcon.png")} />
              </TouchableWithoutFeedback>
              <Button onPress={onFindTeamPress} text={"Find A Team"}></Button>
            </IconContainer>
            <IconContainer>
              <TouchableWithoutFeedback onPress={onFindPlayerPress}>
                <Image
                  source={require("../../../assets/icon/playerIcon.png")}
                />
              </TouchableWithoutFeedback>
              <Button
                onPress={onFindPlayerPress}
                text={"Find A Player"}
              ></Button>
            </IconContainer>
          </Row>
        </ScrollView>
      </Container>
    );
  }
};

export default FindPlayerScreen;
