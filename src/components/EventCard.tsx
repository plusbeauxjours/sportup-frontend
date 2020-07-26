import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import RatingChip from "./RatingChip";
import { formatDate, formatTime } from "../utils/time";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../constants/colors";
import utils from "../utils/utils";

const NameText = styled.Text`
  font-size: 18px;
`;

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

const DateRow = styled(Row)`
  justify-content: flex-start;
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
  const isAndroid = utils.isAndroid();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate("EventScreen", { eventId: id });
      }}
    >
      <Border>
        <InnerUserInfoContainerStyle>
          <Row>
            <NameText style={{ textTransform: "capitalize" }}>{name}</NameText>
            <RatingChip
              sportId={sport.sportId}
              name={sport.name}
              onChipPress={() => {}}
            />
          </Row>
          <DateRow>
            <Ionicons
              name={isAndroid ? "md-person" : "ios-person"}
              size={24}
              color={PRIMARY_COLOR}
              style={{ marginRight: 10 }}
            />
            <Text>Organized by </Text>
            <Text>{owner.name}</Text>
          </DateRow>
          <DateRow>
            {startDate && (
              <>
                <Ionicons
                  name={isAndroid ? "md-calendar" : "ios-calendar"}
                  size={24}
                  color={PRIMARY_COLOR}
                  style={{ marginRight: 10 }}
                />
                <Text>From </Text>
                <Text>{formatDate(startDate)}</Text>
              </>
            )}
            {endDate && (
              <>
                <Text> To </Text>
                <Text>{formatDate(endDate)}</Text>
              </>
            )}
          </DateRow>
          <DateRow>
            {startTime && (
              <>
                <Ionicons
                  name={isAndroid ? "md-clock" : "ios-clock"}
                  size={24}
                  color={PRIMARY_COLOR}
                  style={{ marginRight: 10 }}
                />
                <Text>From </Text>
                <Text>{formatTime(startTime)}</Text>
              </>
            )}
            {endTime && (
              <>
                <Text> To </Text>
                <Text>{formatTime(endTime)}</Text>
              </>
            )}
          </DateRow>
        </InnerUserInfoContainerStyle>
      </Border>
    </Touchable>
  );
};

export default withNavigation(EventCard);
