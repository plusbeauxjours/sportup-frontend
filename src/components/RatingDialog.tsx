import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { Dialog, Button } from "react-native-paper";

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
    <Dialog.Actions>
      <Button onPress={close}>Cancel</Button>
      <Button onPress={onSubmit}>Submit</Button>
    </Dialog.Actions>
  </Dialog>
);

export default RatingDialog;
