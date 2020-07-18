import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Title, Card } from "react-native-paper";
import RatingChip from "./RatingChip";
import styled from "styled-components/native";
import { GetUser_getUser_user_sports } from "../types/api";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { get_or_create_chat } from "../constants/firebase";
import { useMe } from "../context/meContext";
import Button from "./Button";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const View = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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
  ({
    id,
    rating,
    teamName,
    createdBy,
    coverImg,
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
                onPress={() => onPress(createdBy)}
                text={"Message"}
              />
            )}
          </Container>
          <RatingChip
            sportId={sport.sportId}
            name={sport.name}
            onChipPress={() => {}}
          />
        </Card.Content>
      </Card>
    );
  }
);

const TeamCardWithoutCover: React.FC<IProps> = withNavigation(
  ({ id, rating, teamName, createdBy, enableMessage, sport, navigation }) => {
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
                onPress={() => onPress(createdBy)}
                text={"Message"}
              />
            )}
          </Container>
          <View>
            <RatingChip
              sportId={sport.sportId}
              name={sport.name}
              onChipPress={() => {}}
            />
          </View>
        </Card.Content>
      </Card>
    );
  }
);

const TeamCard = (props) => {
  return props.coverImg ? (
    <TeamCardWithCover {...props} />
  ) : (
    <TeamCardWithoutCover {...props} />
  );
};

export default TeamCard;
