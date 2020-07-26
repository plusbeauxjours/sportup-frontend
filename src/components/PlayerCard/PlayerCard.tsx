import React from "react";
import { useQuery } from "react-apollo";
import UserCard from "../UserCard";
import { GET_TEAMS_FOR_PLAYER } from "./PlayerCardQueries";

const PlayerCard = ({ user, sportIds }) => {
  const { data: { getTeamsForPlayer: { teams = null } = {} } = {} } = useQuery(
    GET_TEAMS_FOR_PLAYER,
    {
      variables: { sportIds, userId: user.id },
      fetchPolicy: "network-only",
    }
  );
  return <UserCard user={user} bottomSection={true} />;
};

export default PlayerCard;
