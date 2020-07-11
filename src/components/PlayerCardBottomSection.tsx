import React from "react";
import { withNavigation } from "react-navigation";
import { Caption, Button } from "react-native-paper";
import SportsList from "./SportsList";
import styled from "styled-components/native";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const View = styled.View`
  flex-direction: row;
`;
interface IProps {
  id: string;
  sports: any;
  teams: any;
  navigation;
}

const PlayerCardBottomSection: React.FC<IProps> = ({
  id,
  sports,
  teams,
  navigation,
}) => {
  return (
    <React.Fragment>
      <SportsList sports={sports} />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {teams?.map((team, index) => (
          <Row key={index}>
            <View>
              <Caption>Plays for </Caption>
              <Caption
                style={{ fontWeight: "bold" }}
                onPress={() => {
                  navigation.push("TeamProfileScreen", { teamId: team.id });
                }}
              >
                {team.teamName}
              </Caption>
            </View>
            <Button icon="message" onPress={() => {}}>
              Message
            </Button>
          </Row>
        ))}
      </View>
    </React.Fragment>
  );
};

export default withNavigation(PlayerCardBottomSection);
