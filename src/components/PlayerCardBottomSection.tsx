import React from "react";
import { withNavigation } from "react-navigation";
import { Caption } from "react-native-paper";
import SportsList from "./SportsList";
import styled from "styled-components/native";
import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";
import Button from "./Button";

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
  const { me, loading: meLoading } = useMe();
  const onPress = async (team) => {
    const new_key_chats = await get_or_create_chat();
    if (new_key_chats) {
      navigation.push("ChatScreen", {
        chatId: new_key_chats,
        senderUserId: me?.user.id,
        senderUsername: me?.user.username,
        senderPushToken: me?.user.pushToken,
        receiverUserId: team.createdBy.id,
        receiverUsername: team.createdBy.username,
        receiverPushToken: team.createdBy.pushToken,
      });
    }
  };

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
            <Button
              icon="message"
              onPress={() => onPress(team)}
              text={"Message"}
            />
          </Row>
        ))}
      </View>
    </React.Fragment>
  );
};

export default withNavigation(PlayerCardBottomSection);
