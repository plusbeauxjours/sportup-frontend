import React from "react";
import { useQuery } from "react-apollo";
import { Card } from "react-native-elements";
import UserCard from "../UserCard";
import PlayerCardBottomSection from "../PlayerCardBottomSection";
import { GET_TEAMS_FOR_PLAYER } from "./PlayerCardQueries";

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
    <Card>
      {console.log(sports)}
      <UserCard
        userId={id}
        userImg={userImg}
        name={name}
        username={username}
        isFollowing={isFollowing}
      />
      <PlayerCardBottomSection id={id} sports={sports} teams={teams} />
    </Card>
  );
};

export default PlayerCard;
