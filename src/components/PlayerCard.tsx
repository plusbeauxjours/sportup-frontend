import React from "react";
import UserCard from "./UserCard";
import PlayerCardBottomSection from "./PlayerCardBottomSection";
import { Card } from "react-native-elements";

interface IProps {
  id: string;
  userImg: string;
  name: string;
  username: string;
  bio: string;
  isFollowing: boolean;
  sports?: any;
  team?: any;
}

const PlayerCard: React.FC<IProps> = ({
  id,
  userImg,
  name,
  username,
  bio,
  isFollowing,
  sports,
  team,
}) => {
  return (
    <Card>
      <UserCard
        id={id}
        userImg={userImg}
        name={name}
        username={username}
        bio={bio}
        isFollowing={isFollowing}
      />
      <PlayerCardBottomSection id={id} sports={sports} team={team} />
    </Card>
  );
};

export default PlayerCard;
