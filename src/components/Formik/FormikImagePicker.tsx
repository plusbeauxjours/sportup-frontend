import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import { Button } from "react-native-paper";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";

interface IProps {
  initialImg: { uri: any };
  value: {
    uri: any;
  };
  onChoose: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
}

export default class FormikImagePicker extends React.Component<IProps> {
  public onChoose = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      const localUri = result.uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      this.props.onChoose(this.props.name, {
        uri: localUri,
        name: filename,
        type,
      });
    }
  };

  public render() {
    let img = null;
    if (this.props.value.uri === this.props.initialImg.uri) {
      img = { uri: MEDIA_URL + this.props.initialImg.uri };
    } else if (this.props.value) {
      img = { uri: this.props.value.uri };
    } else if (this.props.initialImg) {
      img = { uri: MEDIA_URL + this.props.initialImg.uri };
    } else {
      img = NO_AVATAR_THUMBNAIL;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginTop: 20,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Avatar size="large" rounded source={img} />
        <Button onPress={this.onChoose}>Choose</Button>
      </View>
    );
  }
}
