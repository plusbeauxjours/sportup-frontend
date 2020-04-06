import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import RatingChip from "./RatingChip";
import styled from "styled-components";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from "react-navigation-stack";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface IProps extends NavigationStackScreenProps {
  uuid: string;
  name: string;
  coverImg?: string;
  sport: Array<any>;
  enableMessage: boolean;
}

const TeamCard: NavigationStackScreenComponent<IProps> = withNavigation(
  ({ id, name, coverImg, enableMessage, sport, navigation }) => {
    return (
      <Card>
        {coverImg && <Card.Cover source={{ uri: coverImg }} />}
        <Card.Content>
          <Container>
            <TouchableOpacity
              onPress={() => {
                navigation.push("Team", { teamId: id });
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
            sportId={sport.sportId}
            name={sport.name}
            rating={sport.team}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>
    );
  }
);

export default TeamCard;
