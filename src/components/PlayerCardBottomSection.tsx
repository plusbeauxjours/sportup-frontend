import React from "react";
import { withNavigation } from "react-navigation";
import { Caption, Subheading, Divider } from "react-native-paper";
import SportsList from "./SportsList";
import styled from "styled-components/native";
import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";
import RatingChip from "./RatingChip";

const OuterUserInfoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const InnerUserInfoContainerStyle = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const View = styled.View`
  flex-direction: row;
`;

const WhiteSpace = styled.View`
  height: 10px;
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
      <WhiteSpace />
      <SportsList sports={sports} />
      <WhiteSpace />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {teams?.map((team, index) => (
          <>
            <Divider />
            <OuterUserInfoContainerStyle key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("TeamProfileScreen", { teamId: team?.id });
                }}
              >
                <InnerUserInfoContainerStyle>
                  <Row>
                    <Subheading style={{ textTransform: "capitalize" }}>
                      {team?.teamName}
                    </Subheading>
                    <RatingChip
                      sportId={team.sport.sportId}
                      name={team.sport.name}
                      onChipPress={() => {}}
                      disabled={true}
                    />
                  </Row>
                  <Caption>{`Created by ${team?.createdBy.name} (@${team?.createdBy.username})`}</Caption>
                </InnerUserInfoContainerStyle>
              </TouchableOpacity>
            </OuterUserInfoContainerStyle>
          </>
        ))}
      </View>
    </React.Fragment>
  );
};

export default withNavigation(PlayerCardBottomSection);
