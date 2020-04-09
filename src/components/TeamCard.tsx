import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import RatingChip from "./RatingChip";
import styled from "styled-components";
import { GetUser_getUser_user_sports } from "../types/api";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface IProps extends NavigationStackScreenProps {
  uuid: string;
  name: string;
  coverImg?: string;
  sport: GetUser_getUser_user_sports;
  enableMessage?: boolean;
}

const TeamCardWithCover: NavigationStackScreenComponent<IProps> = withNavigation(
  ({ uuid, name, coverImg, enableMessage, sport, navigation }) => (
    <Card>
      {coverImg && <Card.Cover source={{ uri: coverImg }} />}
      <Card.Content>
        <Container>
          <TouchableOpacity
            onPress={() => {
              navigation.push("TeamProfile", { uuid });
            }}
          >
            <Title numberOfLines={1} style={{ fontWeight: "bold" }}>
              {name}
            </Title>
          </TouchableOpacity>
          {enableMessage && (
            <Button
              primary
              raised
              icon="message"
              onPress={() => {
                console.log("go to chat");
              }}
            >
              Message
            </Button>
          )}
        </Container>
        <RatingChip
          sportUuid={sport.sportUuid}
          name={sport.name}
          rating={sport.team}
          onPress={() => {}}
        />
      </Card.Content>
    </Card>
  )
);
const TeamCardWithoutCover: NavigationStackScreenComponent<IProps> = withNavigation(
  ({ uuid, name, enableMessage, sport, navigation }) => (
    <Card>
      <Card.Content>
        <Container>
          <TouchableOpacity
            onPress={() => {
              navigation.push("TeamProfile", { uuid });
            }}
          >
            <Title numberOfLines={1} style={{ fontWeight: "bold" }}>
              {name}
            </Title>
          </TouchableOpacity>
          {enableMessage && (
            <Button
              primary
              raised
              icon="message"
              onPress={() => {
                console.log("go to chat");
              }}
            >
              Message
            </Button>
          )}
        </Container>
        <RatingChip
          sportUuid={sport.sportUuid}
          name={sport.name}
          rating={sport.team}
          onPress={() => {}}
        />
      </Card.Content>
    </Card>
  )
);

const TeamCard = (props) => {
  return props.coverImg ? (
    <TeamCardWithCover {...props} />
  ) : (
    <TeamCardWithoutCover {...props} />
  );
};

export default TeamCard;
