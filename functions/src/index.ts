const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.database
    .ref("messages/{roomId}/{messageId}")
    .onCreate((event) => {
        let sendMsg
        const senderUsername = event._data.user.senderUsername;
        const receiverPushToken = event._data.receiver.receiverPushToken;
        if (event._data.text) {
            sendMsg = event._data.text
        } else if (event._data.location) {
            sendMsg = "LOCATION"
        } else {
            sendMsg = event._data.snsIdPlatform
        }
        if (receiverPushToken) {
            return axios.post("https://exp.host/--/api/v2/push/send", {
                to: receiverPushToken,
                title: "New message",
                body: `${senderUsername}: ${sendMsg}`
            });
        }
    });