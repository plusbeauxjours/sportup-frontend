import React from "react";
import { Title, Caption } from "react-native-paper";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 70px;
`;
const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  height: 70px;
`;
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

interface IProps {
  teams: number;
  followers: number;
  following: number;
  onTeamsPress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
}

const UserConnectionsCard: React.FC<IProps> = ({
  teams = 0,
  followers = 0,
  following = 0,
  onTeamsPress = null,
  onFollowersPress = null,
  onFollowingPress = null
}) => (
  <Container>
    <TouchableOpacity onPress={onTeamsPress}>
      <View>
        <Title>{teams}</Title>
        <Caption>Teams</Caption>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onFollowersPress}>
      <View>
        <Title>{followers}</Title>
        <Caption>Followers</Caption>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onFollowingPress}>
      <View>
        <Title>{following}</Title>
        <Caption>Following</Caption>
      </View>
    </TouchableOpacity>
  </Container>
);
export default UserConnectionsCard;
