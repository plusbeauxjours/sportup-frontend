import React from "react";
import { withNavigation } from "react-navigation";
import { Headline } from "react-native-paper";
import styled from "styled-components/native";
import RatingChip from "./RatingChip";
import { formatDate, formatTime } from "../utils/time";

const Border = styled.View`
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding: 10px 0;
`;

const InnerUserInfoContainerStyle = styled.View`
  justify-content: center;
  padding: 0 10px 0 10px;
`;

const Touchable = styled.TouchableOpacity`
  padding: 3px;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Text = styled.Text``;

const EventCard = ({
  id,
  name,
  sport,
  owner,
  startDate,
  endDate,
  startTime,
  endTime,
  navigation,
}) => {
  return (
    <Touchable
      onPress={() => {
        navigation.navigate("EventScreen", { eventId: id });
      }}
    >
      <Border>
        <InnerUserInfoContainerStyle>
          <Row>
            <Headline>{name}</Headline>
            <RatingChip
              sportId={sport.sportId}
              name={sport.name}
              onChipPress={() => {}}
            />
          </Row>
          <Text>
            <Text>Organized by </Text>
            <Text style={{ fontWeight: "bold" }}>{owner.name}</Text>
          </Text>
          {startDate && (
            <>
              <Text>from </Text>
              <Text style={{ fontWeight: "bold" }}>
                {formatDate(startDate)}
              </Text>
            </>
          )}
          {endDate && (
            <>
              <Text> to </Text>
              <Text style={{ fontWeight: "bold" }}>{formatDate(endDate)}</Text>
            </>
          )}
          <Text> | </Text>
          {startTime && (
            <>
              <Text>from </Text>
              <Text style={{ fontWeight: "bold" }}>
                {formatTime(startTime)}
              </Text>
            </>
          )}
          {endTime && (
            <>
              <Text> to </Text>
              <Text style={{ fontWeight: "bold" }}>{formatTime(endTime)}</Text>
            </>
          )}
        </InnerUserInfoContainerStyle>
      </Border>
    </Touchable>
  );
};

export default withNavigation(EventCard);
