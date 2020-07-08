import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import FollowBtn from "./FollowBtn";

const View = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface IProps {
  id: string;
  isFollowing: boolean;
}

const UserInteractionCard: React.FC<IProps> = ({ id, isFollowing }) => {
  return (
    <View>
      <Button icon="message" onPress={() => console.log("go to chat")}>
        Message
      </Button>
      <FollowBtn isFollowing={isFollowing} id={id} />
    </View>
  );
};

export default UserInteractionCard;
