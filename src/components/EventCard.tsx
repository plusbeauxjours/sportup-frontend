import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Headline, Caption } from "react-native-paper";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
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

const Row = styled.View`
  flex: 1;
  flex-wrap: wrap;
`;

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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EventScreen", { eventId: id });
      }}
    >
      <Card style={{ padding: 3 }}>
        <Border>
          <InnerUserInfoContainerStyle>
            <Headline>{name}</Headline>
            <Row>
              <RatingChip
                sportId={sport.sportId}
                name={sport.name}
                onChipPress={() => {}}
              />
            </Row>
            <Caption>
              <Caption>Organized by </Caption>
              <Caption style={{ fontWeight: "bold" }}>{owner.name}</Caption>
            </Caption>
            <Caption>
              {startDate && (
                <React.Fragment>
                  <Caption>from </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatDate(startDate)}
                  </Caption>
                </React.Fragment>
              )}
              {endDate && (
                <React.Fragment>
                  <Caption> to </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatDate(endDate)}
                  </Caption>
                </React.Fragment>
              )}
              <Caption> | </Caption>
              {startTime && (
                <React.Fragment>
                  <Caption>from </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatTime(startTime)}
                  </Caption>
                </React.Fragment>
              )}
              {endTime && (
                <React.Fragment>
                  <Caption> to </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatTime(endTime)}
                  </Caption>
                </React.Fragment>
              )}
            </Caption>
          </InnerUserInfoContainerStyle>
        </Border>
      </Card>
    </TouchableOpacity>
  );
};

export default withNavigation(EventCard);
