import React, { useState, useEffect, useRef } from "react";
import { View, Alert } from "react-native";
import MapView from "react-native-maps";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";

import Button from "../../components/Button";

const ICON_SIZE = 35;

const INITIAL_REGION = {
  latitude: 29,
  longitude: 68,
  latitudeDelta: 20,
  longitudeDelta: 16,
};

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const MarkerContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: "transparent";
`;

const ChatSendLocationScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [ready, setReady] = useState<boolean>(false);
  const [region, setRegion] = useState<any>(INITIAL_REGION);

  const onMapReady = () => {
    setReady(true);
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onSend = () => {
    const { longitude, latitude } = region;
    navigation.state.params.onSend({
      location: { longitude, latitude },
    });
    navigation.goBack();
  };

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  const setRegionFn = (region) => {
    if (ready && mapRef) {
      mapRef.current.animateToRegion(region);
    }
  };

  const getCurrentPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          setRegionFn(region);
        },
        (error) => {
          switch (error.code) {
            case 1:
              Alert.alert(
                "Error",
                "To find your location, please allow the app to access your location."
              );
              break;
            default:
              Alert.alert(
                "Error",
                "There was an error detecting your location."
              );
          }
        }
      );
    } catch (e) {
      Alert.alert("Error", e.message || "");
    }
  };
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          onMapReady={onMapReady}
          onRegionChangeComplete={onRegionChangeComplete}
          style={{ flex: 1 }}
        />
        <MarkerContainer>
          <Icon
            name="location-on"
            color="red"
            size={ICON_SIZE}
            containerStyle={{ marginBottom: ICON_SIZE - 4 }}
          />
        </MarkerContainer>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
        }}
      >
        <Button color="red" onPress={onCancel} text={"Cancel"} />
        <Button color="#4a80f5" onPress={onSend} text={"Send"} />
      </View>
    </View>
  );
};
ChatSendLocationScreen.navigationOptions = () => ({
  header: null,
});

export default ChatSendLocationScreen;
