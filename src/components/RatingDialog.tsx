import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { Dialog } from "react-native-paper";
import styled from "styled-components/native";

const Button = styled.Button`
  margin-top: 10px;
  width: 90%;
`;

interface IProps {
  rating?: number;
  onStarRatingPress: (rating: number) => void;
  visible: boolean;
  close: () => void;
  onSubmit: () => void;
}
const RatingDialog: React.FC<IProps> = ({
  rating = 0,
  onStarRatingPress,
  visible,
  close,
  onSubmit,
}) => (
  <Dialog visible={visible} onDismiss={close}>
    <Dialog.Content>
      <AirbnbRating
        showRating
        type="custom"
        ratingColor="black"
        defaultRating={rating}
        onFinishRating={onStarRatingPress}
      />
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={close} title="Cancel" />
      <Button onPress={onSubmit} title="Submit" />
    </Dialog.Actions>
  </Dialog>
);

export default RatingDialog;
