import React from "react";
import { useQuery } from "react-apollo";
import UserCard from "../UserCard";
import PlayerCardBottomSection from "../PlayerCardBottomSection";
import { GET_TEAMS_FOR_PLAYER } from "./PlayerCardQueries";
import styled from "styled-components/native";

const Border = styled.View`
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding: 10px;
  margin: 3px;
`;

interface IProps {
  id: string;
  userImg: string;
  name: string;
  username: string;
  isFollowing: boolean;
  sports?: any;
  sportIds?: [];
}

const PlayerCard: React.FC<IProps> = ({
  id,
  userImg,
  name,
  username,
  isFollowing,
  sports,
  sportIds,
}) => {
  const { data: { getTeamsForPlayer: { teams = null } = {} } = {} } = useQuery(
    GET_TEAMS_FOR_PLAYER,
    {
      variables: { sportIds, userId: id },
      fetchPolicy: "network-only",
    }
  );
  return (
    <Border>
      <UserCard
        userId={id}
        userImg={userImg}
        name={name}
        username={username}
        isFollowing={isFollowing}
      />
      <PlayerCardBottomSection id={id} sports={sports} teams={teams} />
    </Border>
  );
};

export default PlayerCard;
