import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import * as moment from "moment-timezone";
import { withNavigation } from "react-navigation";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { Avatar } from "react-native-elements";

import * as firebase from "firebase/app";
import "firebase/database";

import CustomView from "./CustomView";
import {
  TouchableOpacity,
  BackHandler,
  View,
  Text,
  Alert,
  Platform,
  Linking,
} from "react-native";
import ChatPresenter from "./ChatScreenPresenter";
import {
  chat_send,
  get_new_key,
  UserChatMessage,
  ChatMessage,
  get_old_chat_messages,
  update_message_info,
} from "../../constants/firebase";
import { NO_AVATAR_THUMBNAIL } from "../../constants/urls";

const ChatContainer = ({ navigation }) => {
  const chatId = navigation.getParam("chatId") || 1;
  const userId = navigation.getParam("userId") || 3;
  const receiverId = navigation.getParam("receiverId") || 4;
  const receiverPushToken = navigation.getParam("receiverPushToken") || null;
  const userName = navigation.getParam("userName") || "sexkin";
  const targetUserId = navigation.getParam("targetUserId") || 1;

  const dbref = firebase.database().ref("messages");
  // .child(navigation.getParam("chatId"));
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [region, setRegion] = useState<any>({
    latitude: 20,
    longitude: 20,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const onRegionChangeComplete = (region: any) => {
    setRegion(region);
  };

  const onSend = (messages = []) => {
    let msg = messages[0];
    if (msg) {
      msg._id = get_new_key("messages");
      msg.user.name = userName;
      msg.receiverPushToken = receiverPushToken;
      msg.status = false;
      chat_send(chatId, msg).catch((e) => console.log(e));
      setMessages((previousMsg) => GiftedChat.append(previousMsg, msg));
    }
  };

  const onSendLocation = (latitude: string, longitude: string) => {
    let new_key = get_new_key("messages");
    let user: UserChatMessage = {
      _id: userId,
      name: userName,
    };
    let messageLocation: ChatMessage = {
      _id: new_key,
      createdAt: new Date(),
      status: false,
      user: user,
      location: { latitude, longitude },
      receiverPushToken,
    };
    let messages = [];
    messages.push(messageLocation);
    setMessages((previousMsg) => GiftedChat.append(previousMsg, messages));
    setMapModalOpen(false);
    chat_send(chatId, messageLocation).catch((e) => console.log(e));
  };

  const renderCustomView = (props) => {
    return <CustomView {...props} />;
  };

  const renderAvatar = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("UserProfile", {
            userId: targetUserId,
          })
        }
      >
        <Avatar
          rounded
          source={{
            uri: NO_AVATAR_THUMBNAIL,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderActions = () => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() => {
          askPermission();
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#999",
            borderStyle: "solid",
            borderWidth: 0.5,
            borderRadius: 5,
            padding: 2,
          }}
        >
          <Text style={{ color: "#999", textAlign: "center", fontSize: 10 }}>
            MAP
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const closeMapModal = () => {
    setMapModalOpen(false);
  };

  const sortByDate = (a, b) => {
    let date1 = new Date(a.createdAt).getTime();
    let date2 = new Date(b.createdAt).getTime();
    return date1 < date2 ? 1 : date2 < date1 ? -1 : 0;
  };

  const didBlurSubscription = navigation.addListener("didBlur", (payload) => {
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return;
    });
    dbref.off("child_added");
  });

  const messageFooter = (timeProps) => {
    const { currentMessage, position } = timeProps;
    const timeZone = moment.tz.guess();
    const time = moment.tz(currentMessage.createdAt, timeZone).format("LT");
    if (position === "left") {
      const text = (
        <Text style={{ left: 10, fontSize: 8, color: "black" }}>{time}</Text>
      );
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: 50,
          }}
        >
          {text}
        </View>
      );
    } else {
      const text = (
        <Text
          style={{
            right: 10,
            fontSize: 8,
            color: "white",
          }}
        >
          {time}
        </Text>
      );
      return (
        <>
          {currentMessage.status ? (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: 50,
              }}
            >
              {text}
              <Text style={{ fontSize: 11, color: "white", right: 10 }}>
                Read
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: 50,
              }}
            >
              {text}
            </View>
          )}
        </>
      );
    }
  };

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { locationServicesEnabled } = await Location.getProviderStatusAsync();
    if (locationServicesEnabled) {
      if (Platform.OS === "ios" && status === "denied") {
        Alert.alert(
          "Permission Denied",
          "To enable location, tap Open Settings, then tap on Location, and finally tap on While Using the App.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                setMapLoading(false);
                setMapModalOpen(false);
              },
            },
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openURL("app-settings:"), setMapLoading(false);
                setMapModalOpen(false);
              },
            },
          ]
        );
      } else if (Platform.OS === "android" && status === "denied") {
        Alert.alert(
          "Permission Denied",
          "To enable location, tap Open Settings, then tap on Permissions, then tap on Location, and finally tap on Allow only while using the app.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                setMapLoading(false);
                setMapModalOpen(false);
              },
            },
            {
              text: "Open Settings",
              onPress: () => {
                const pkg = Constants.manifest.releaseChannel
                  ? Constants.manifest.android.package
                  : "host.exp.exponent";
                IntentLauncher.startActivityAsync(
                  IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                  { data: "package:" + pkg }
                ),
                  setMapLoading(false);
                setMapModalOpen(false);
              },
            },
          ]
        );
      } else if (status === "granted") {
        setMapLoading(true);
        setMapModalOpen(true);
        const position = await Location.getCurrentPositionAsync({
          timeout: 5000,
        });
        handleGeoSuccess(position);
      } else {
        return;
      }
    } else {
      Alert.alert("Location permission required.");
    }
  };

  const handleGeoSuccess = (position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setMapLoading(false);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (!overlayVisible) {
        navigation.navigate("ChatListScreen");
      } else {
        setOverlayVisible(false);
      }
    });
    get_old_chat_messages(chatId).then((messages) => {
      if (messages) {
        let promises = messages.map((m) =>
          update_message_info(m, chatId, userId)
        );
        Promise.all(promises).then((results) => {
          setMessages(results.filter((r) => r).sort(sortByDate));
        });
      }
    });
    let start_key = get_new_key("messages");
    firebase
      .database()
      .ref()
      .child("messages")
      .child(chatId)
      .orderByKey()
      .startAt(start_key)
      .on("child_changed", (child) => {
        if (child && child.val()) {
          if (child.val()["status"] === true) {
            setMessages(
              messages.map((previousState) =>
                previousState._id === child.val()["_id"]
                  ? { ...previousState, ...child.val() }
                  : previousState
              )
            );
          }
        }
      });
    firebase
      .database()
      .ref()
      .child("messages")
      .child(chatId)
      .orderByKey()
      .startAt(start_key)
      .on("child_added", (child) => {
        /* tslint:disable:no-string-literal */
        if (child && child.val()) {
          let message_container = [];
          let new_message = child.val();
          if (new_message.system || new_message.user._id !== userId) {
            update_message_info(new_message, chatId, userId).then(
              (updated_message) => {
                message_container.push(new_message);
                setMessages((previousMsg) => ({
                  messages: GiftedChat.append(
                    previousMsg,
                    message_container
                  ).sort(sortByDate),
                }));
              }
            );
          }
        }
      });
    return () => {
      didBlurSubscription.remove();
    };
  }, []);

  return (
    <ChatPresenter
      userId={userId}
      mapModalOpen={mapModalOpen}
      messages={messages}
      onSend={onSend}
      onSendLocation={onSendLocation}
      renderCustomView={renderCustomView}
      renderActions={renderActions}
      closeMapModal={closeMapModal}
      messageFooter={messageFooter}
      renderAvatar={renderAvatar}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
      mapLoading={mapLoading}
    />
  );
};

export default withNavigation(ChatContainer);
