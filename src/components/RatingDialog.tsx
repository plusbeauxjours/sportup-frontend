import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { Dialog } from "react-native-paper";
import Button from "./Button";

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
  <Dialog visible={visible} onDismiss={close} style={{ zIndex: 20 }}>
    <Dialog.Content>
      <AirbnbRating
        showRating
        type="custom"
        ratingColor="black"
        defaultRating={rating}
        onFinishRating={onStarRatingPress}
      />
    </Dialog.Content>
    <Dialog.Actions style={{ flexDirection: "row", justifyContent: "center" }}>
      <Button onPress={close} text={"Cancel"} />
      <Button onPress={onSubmit} text={"Submit"} />
    </Dialog.Actions>
  </Dialog>
);

export default RatingDialog;
