import React from "react";
import { Platform, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styled from "styled-components/native";

import { mapStyle } from "../../constants/mapStyle";

const Touchable = styled.TouchableOpacity`
  overflow: hidden;
  border-radius: 13px;
`;

export default ({ currentMessage }) => {
  const onMapPress = () => {
    const { latitude, longitude } = currentMessage.location;
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=*`,
      android: `http://maps.google.com/?q=${latitude},${longitude}`,
    });
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  if (currentMessage.location) {
    return (
      <Touchable onPress={onMapPress} activeOpacity={0.8}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: 200,
            height: 100,
            borderRadius: 13,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}
          onPress={onMapPress}
          scrollEnabled={false}
          zoomEnabled={false}
          loadingEnabled={true}
          rotateEnabled={false}
          customMapStyle={mapStyle}
        />
      </Touchable>
    );
  } else {
    return null;
  }
};
