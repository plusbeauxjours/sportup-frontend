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
  margin: 3px;
`;

const OuterUserInfoContainerStyle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  align-items: center;
  padding: 10px;
`;

const InnerUserInfoContainerStyle = styled.View`
  width: 100%;
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

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

const EventCard = ({ event, navigation }) => {
  const isAndroid = utils.isAndroid();
  return (
    <Touchable
      key={event.id}
      onPress={() => {
        navigation.navigate("EventScreen", { eventId: event.id });
      }}
    >
      <Border>
        <OuterUserInfoContainerStyle>
          <InnerUserInfoContainerStyle>
            <Row>
              <NameText style={{ textTransform: "capitalize" }}>
                {event.name}
              </NameText>
              <RatingChip
                sportId={event.sport.sportId}
                name={event.sport.name}
                onChipPress={() => {}}
                disabled={true}
              />
            </Row>
            <DateRow>
              <Ionicons
                name={isAndroid ? "md-person" : "ios-person"}
                size={16}
                color={PRIMARY_COLOR}
                style={{ marginRight: 10 }}
              />
              <Caption>Organized by </Caption>
              <Caption>{event.owner.name}</Caption>
            </DateRow>
            <DateRow>
              {event?.startDate && (
                <>
                  <Ionicons
                    name={isAndroid ? "md-calendar" : "ios-calendar"}
                    size={16}
                    color={PRIMARY_COLOR}
                    style={{ marginRight: 10 }}
                  />
                  <Caption>From </Caption>
                  <Caption>{formatDate(event.startDate)}</Caption>
                </>
              )}
              {event?.endDate && (
                <>
                  <Caption> To </Caption>
                  <Caption>{formatDate(event.endDate)}</Caption>
                </>
              )}
            </DateRow>
            <DateRow>
              {event?.startTime && (
                <>
                  <Ionicons
                    name={isAndroid ? "md-clock" : "ios-clock"}
                    size={16}
                    color={PRIMARY_COLOR}
                    style={{ marginRight: 10 }}
                  />
                  <Caption>From </Caption>
                  <Caption>{formatTime(event.startTime)}</Caption>
                </>
              )}
              {event?.endTime && (
                <>
                  <Caption> To </Caption>
                  <Caption>{formatTime(event.endTime)}</Caption>
                </>
              )}
            </DateRow>
          </InnerUserInfoContainerStyle>
        </OuterUserInfoContainerStyle>
      </Border>
    </Touchable>
  );
};

export default withNavigation(EventCard);
