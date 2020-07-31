import React from "react";
import { withNavigation } from "react-navigation";
import RatingChip from "./RatingChip";
import styled from "styled-components/native";
// import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";

const Border = styled.View`
  border-color: #999;
  border-width: 0.5px;
  border-radius: 20px;
  padding: 10px;
  margin: 3px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
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
  flex-direction: column;
  justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TeamCard = ({ team, navigation }) => {
  const { me, loading: meLoading } = useMe();
  // const onPress = async (createdBy) => {
  //   const new_key_chats = await get_or_create_chat();
  //   if (new_key_chats) {
  //     navigation.push("ChatScreen", {
  //       chatId: new_key_chats,
  //       senderUserId: me?.user.id,
  //       senderUsername: me?.user.username,
  //       senderPushToken: me?.user.pushToken,
  //       receiverUserId: createdBy.id,
  //       receiverUsername: createdBy.username,
  //       receiverPushToken: createdBy.pushToken,
  //     });
  //   }
  // };
  const onPress = () => {
    navigation.push("TeamProfileScreen", { teamId: team?.id });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Border key={team?.id}>
        <OuterUserInfoContainerStyle>
          <InnerUserInfoContainerStyle>
            <Row>
              <NameText style={{ textTransform: "capitalize" }}>
                {team?.teamName}
              </NameText>
              <RatingChip
                sportId={team?.sport.sportId}
                name={team?.sport.name}
                onChipPress={() => {}}
                disabled={true}
              />
            </Row>
            {team?.rating && <Caption>{`⭐️ ${team?.rating}`}</Caption>}
            <Caption>{`Created by ${team?.createdBy.name} (@${team?.createdBy.username})`}</Caption>
          </InnerUserInfoContainerStyle>
        </OuterUserInfoContainerStyle>
      </Border>
    </TouchableOpacity>
  );
};

export default withNavigation(TeamCard);
