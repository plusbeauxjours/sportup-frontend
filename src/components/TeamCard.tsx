import React from "react";
import { withNavigation } from "react-navigation";
import RatingChip from "./RatingChip";
import styled from "styled-components/native";
import { GetUser_getUser_user_sports } from "../types/api";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";

const Border = styled.View`
  border-color: #999;
  border-width: 0.2px;
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

interface IProps extends NavigationStackScreenProps {
  id: string;
  teamName: string;
  coverImg?: string;
  sport: GetUser_getUser_user_sports;
  rating?: number;
  enableMessage?: boolean;
  createdBy?: any;
  navigation;
}

const TeamCard: React.FC<IProps> = ({
  id,
  teamName,
  createdBy,
  rating,
  enableMessage,
  sport,
  navigation,
}) => {
  const { me, loading: meLoading } = useMe();
  const onPress = async (createdBy) => {
    const new_key_chats = await get_or_create_chat();
    if (new_key_chats) {
      navigation.push("ChatScreen", {
        chatId: new_key_chats,
        senderUserId: me?.user.id,
        senderUsername: me?.user.username,
        senderPushToken: me?.user.pushToken,
        receiverUserId: createdBy.id,
        receiverUsername: createdBy.username,
        receiverPushToken: createdBy.pushToken,
      });
    }
  };
  return (
    <Border>
      <OuterUserInfoContainerStyle key={id}>
        <TouchableOpacity onPress={onPress}>
          <InnerUserInfoContainerStyle>
            <Row>
              <NameText style={{ textTransform: "capitalize" }}>
                {teamName}
              </NameText>
              <RatingChip
                sportId={sport.sportId}
                name={sport.name}
                onChipPress={() => {}}
                disabled={true}
              />
            </Row>
            {rating && <Caption>{`⭐️ ${rating}`}</Caption>}
            <Caption>{`Created by ${createdBy.name} (@${createdBy.username})`}</Caption>
          </InnerUserInfoContainerStyle>
        </TouchableOpacity>
      </OuterUserInfoContainerStyle>
    </Border>
  );
};

export default withNavigation(TeamCard);
