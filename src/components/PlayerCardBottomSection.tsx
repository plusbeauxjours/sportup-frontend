import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { Caption, Button } from "react-native-paper";
import SportsList from "./SportsList";

interface IProps {
  id: string;
  sports: any;
  team: any;
  navigation;
}

const PlayerCardBottomSection: React.FC<IProps> = ({
  id,
  sports,
  team,
  navigation,
}) => {
  return (
    <View style={{ padding: 5 }}>
      <SportsList sports={sports} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {team ? (
          <Caption style={{ paddingHorizontal: 5 }} numberOfLines={1}>
            <Caption>Plays for </Caption>
            <Caption
              style={{ fontWeight: "bold" }}
              onPress={() => {
                navigation.push("Team", { teamId: team.id });
              }}
            >
              {team.name}
            </Caption>
          </Caption>
        ) : (
          <View />
        )}
        <Button icon="message" onPress={() => {}}>
          Message
        </Button>
      </View>
    </View>
  );
};

export default withNavigation(PlayerCardBottomSection);
