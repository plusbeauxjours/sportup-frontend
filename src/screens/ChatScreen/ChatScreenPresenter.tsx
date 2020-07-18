import React, { useState } from "react";
import styled from "styled-components/native";
import {
  GiftedChat,
  InputToolbar,
  Send,
  Composer,
} from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Platform, Modal as MapModal, SafeAreaView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import constants from "../../constants/dimensions";
import { mapStyle } from "../../constants/mapStyle";
import Loader from "../../components/Loader";

const View = styled.View``;

const ChatContainer = styled.View`
  flex: 1;
  background-color: transparent;
`;

const Footer = styled.View`
  margin-left: 20px;
  position: absolute;
  bottom: 25px;
  justify-content: space-between;
  width: ${constants.width - 40};
  flex-direction: row;
`;

const MarkerContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const MapText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  opacity: 1;
`;

const MapBtn = styled.TouchableOpacity`
  justify-content: center;
  width: ${(constants.width - 50) / 2};
  height: 40px;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #999;
  border-radius: 5px;
  background-color: transparent;
`;

const MapBackBtn = styled.View`
  width: ${(constants.width - 50) / 2};
  height: 40px;
  border-radius: 5px;
  background-color: transparent;
`;

interface IProps {
  userId: string;
  mapModalOpen: boolean;
  messages: any;
  onSend: any;
  onSendLocation: any;
  renderCustomView: any;
  renderActions: any;
  closeMapModal: () => void;
  messageFooter: (timeProps: any) => void;
  renderAvatar: any;
  region: any;
  onRegionChangeComplete: (region: any) => void;
  mapLoading: boolean;
}

const ChatPresenter: React.FunctionComponent<IProps> = ({
  userId,
  mapModalOpen,
  messages,
  onSend,
  onSendLocation,
  renderCustomView,
  renderActions,
  closeMapModal,
  messageFooter,
  renderAvatar,
  region,
  onRegionChangeComplete,
  mapLoading,
}) => {
  const [ready, setReady] = useState<boolean>(false);

  const onMapReady = () => {
    if (!ready) {
      setReady(true);
    }
  };

  const renderComposer = (props) => <Composer {...props} />;

  const renderSend = (props) => (
    <Send {...props}>
      <View
        style={{
          top: -2,
          backgroundColor: "transparent",
          height: 40,
          width: 40,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="send" size={22} color="#999" />
      </View>
    </Send>
  );

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar containerStyle={{ height: 45 }} {...props}>
        {renderSend(props)}
        {renderComposer(props)}
      </InputToolbar>
    );
  };
  return (
    <>
      <MapModal visible={mapModalOpen} transparent={true}>
        {mapLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                borderRadius: 5,
                height: constants.height,
              }}
              initialRegion={region}
              showsUserLocation={true}
              showsMyLocationButton={false}
              onMapReady={onMapReady}
              loadingEnabled={true}
              rotateEnabled={false}
              onRegionChangeComplete={onRegionChangeComplete}
              customMapStyle={mapStyle}
            />
            <MarkerContainer pointerEvents="none">
              <Ionicons
                name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
                size={40}
                color={"#3897f0"}
                pointerEvents="none"
                containerStyle={{ marginBottom: 30 }}
              />
            </MarkerContainer>
            <Footer>
              <MapBackBtn>
                <MapBtn onPress={() => closeMapModal()}>
                  <MapText>BACK</MapText>
                </MapBtn>
              </MapBackBtn>
              <MapBackBtn>
                <MapBtn
                  onPress={() =>
                    onSendLocation(region.latitude, region.longitude)
                  }
                >
                  <MapText>SEND</MapText>
                </MapBtn>
              </MapBackBtn>
            </Footer>
          </React.Fragment>
        )}
      </MapModal>
      <ChatContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: userId,
            }}
            renderCustomView={renderCustomView}
            renderActions={renderActions}
            //@ts-ignore
            renderTime={messageFooter}
            renderAvatar={renderAvatar}
            isAnimated
            scrollToBottom
            alwaysShowSend
            submitOnReturn
            placeholderTextColor={"#999"}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            minInputToolbarHeight={45}
          />
          <KeyboardSpacer />
        </SafeAreaView>
      </ChatContainer>
    </>
  );
};

export default ChatPresenter;
