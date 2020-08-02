import React from "react";
import { withNavigation } from "react-navigation";
import { Divider } from "react-native-paper";
import SportsList from "./SportsList";
import styled from "styled-components/native";
import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";
import RatingChip from "./RatingChip";
import { GetUser_getUser_user_sports } from "../types/api";

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
  align-items: center;
`;

const View = styled.View`
  flex-direction: row;
`;

const WhiteSpace = styled.View`
  height: 10px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

interface IProps {
  id: string;
  sports: GetUser_getUser_user_sports;
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
          <React.Fragment key={index}>
            <Divider />
            <OuterUserInfoContainerStyle>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("TeamProfileScreen", { teamId: team?.id });
                }}
              >
                <InnerUserInfoContainerStyle>
                  <Row>
                    <NameText style={{ textTransform: "capitalize" }}>
                      {team?.teamName}
                    </NameText>
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
          </React.Fragment>
        ))}
      </View>
    </React.Fragment>
  );
};

export default withNavigation(PlayerCardBottomSection);
