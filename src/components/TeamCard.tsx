import React from "react";
import { withNavigation } from "react-navigation";
import RatingChip from "./RatingChip";
import styled from "styled-components/native";

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
  const onPress = () => {
    navigation.push("TeamProfileScreen", { teamId: team?.id });
  };
  return (
    <TouchableOpacity onPress={onPress} key={team?.id}>
      <Border>
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
