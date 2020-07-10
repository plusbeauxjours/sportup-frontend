import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import RatingChip from "./RatingChip";
import styled from "styled-components/native";
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
  id: string;
  teamName: string;
  coverImg?: string;
  sport: GetUser_getUser_user_sports;
  enableMessage?: boolean;
  navigation;
}

const TeamCardWithCover: React.FC<IProps> = withNavigation(
  ({ id, teamName, coverImg, enableMessage, sport, navigation }) => (
    <Card>
      {coverImg && <Card.Cover source={{ uri: coverImg }} />}
      <Card.Content>
        <Container>
          <TouchableOpacity
            onPress={() => {
              navigation.push("TeamProfileScreen", { id });
            }}
          >
            <Title numberOfLines={1} style={{ fontWeight: "bold" }}>
              {teamName}
            </Title>
          </TouchableOpacity>
          {enableMessage && (
            <Button
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
          sportId={sport.sportId}
          name={sport.name}
          rating={sport.team}
          onChipPress={() => {}}
        />
      </Card.Content>
    </Card>
  )
);
const TeamCardWithoutCover: React.FC<IProps> = withNavigation(
  ({ id, teamName, enableMessage, sport, navigation }) => (
    <Card>
      <Card.Content>
        <Container>
          <TouchableOpacity
            onPress={() => {
              navigation.push("TeamProfileScreen", { teamId: id });
            }}
          >
            <Title numberOfLines={1} style={{ fontWeight: "bold" }}>
              {teamName}
            </Title>
          </TouchableOpacity>
          {enableMessage && (
            <Button
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
          sportId={sport.sportId}
          name={sport.name}
          rating={sport.team}
          onChipPress={() => {}}
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
