import * as firebase from "firebase/app";
import "firebase/database";

import keys from "./keys"
import { SystemMessage } from "react-native-gifted-chat";

const firebaseConfig = {
  apiKey: keys.REACT_APP_FIREBASE_API_KEY,
  authDomain: keys.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: keys.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: keys.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: keys.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: keys.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: keys.REACT_APP_FIREBASE_APP_ID,
  measurementId: keys.REACT_APP_FIREBASE_MEASUREMENT_ID
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const fb_db = firebase.database().ref();

export interface SenderChatMessage {
  _id: string;
  senderUsername: string;
  senderPushToken?: string;
}

export interface ReceiverChatMessage {
  _id: string;
  receiverUsername: string;
  receiverPushToken?: string;
}

export interface LocationChatMessage {
  latitude: string;
  longitude: string;
}

export interface ChatMessage {
  _id: string;
  text?: string;
  createdAt: Date;
  status: boolean;
  user: SenderChatMessage;
  receiver: ReceiverChatMessage;
  location?: LocationChatMessage;
}

export const chat_leave = (
  chat_id: string,
  user_id: string,
  user_name: string
) => {
  let new_key_messages = fb_db.ref.child("messages").push().key;
  let message = {
    _id: new_key_messages,
    text: `User ${user_name} left. This chat room will be disappeared`,
    createdAt: new Date(),
    system: true
  };
  let updates = {};
  updates[`/chats/${chat_id}/lastMessage/`] = message.text;
  updates[`/chats/${chat_id}/lastSender/`] = "system";
  updates[`/messages/${chat_id}/${new_key_messages}/`] = message;
  return fb_db.ref.update(updates);
};

export const get_new_key = (child: string) => {
  if (!child) {
    child = "messages";
  }
  let new_key = fb_db.ref.child(child).push().key;
  return new_key;
};

export const chat_send = (chat_id: string, message: ChatMessage) => {
  let new_key_messages;
  if (!message._id) {
    new_key_messages = fb_db.ref.child("messages").push().key;
    message._id = new_key_messages;
  } else {
    new_key_messages = message._id;
  }
  let updates = {};
  updates[`/messages/${chat_id}/${new_key_messages}/`] = message;
  updates[`/chats/${chat_id}/_id/`] = chat_id;
  updates[`/chats/${chat_id}/lastSender/`] = `${message.user._id}`;
  updates[`/chats/${chat_id}/sender/`] = message.user
  updates[`/chats/${chat_id}/receiver/`] = message.receiver
  updates[`/chats/${chat_id}/createdAt/`] = `${message.createdAt}`;
  if (message.text) {
    updates[`/chats/${chat_id}/lastMessage/`] = `${message.text}`;
    updates[`/chats/${chat_id}/status/`] = `${message.status}`;
  }
  return fb_db.ref.update(updates);
};

// To Find chatId with senderUserId and receiverChatId
export const get_or_create_chat = () => {
  let new_key_chats = fb_db.ref.child("chats").push().key;

  return new_key_chats
};

export const update_message_info = async (
  msg: any,
  chat_id: string,
  user_id: string
) => {
  return new Promise<ChatMessage | SystemMessage>((resolve, reject) => {
    if (msg.system) {
      resolve(msg);
    }
    let updated_message: ChatMessage;
    let updates = {};
    if (msg.user._id !== user_id && msg.status === false) {
      msg.status = true;
      updated_message = msg;
      resolve(updated_message);
      updates[`/messages/${chat_id}/${msg._id}/`] = updated_message;
      updates[`/chats/${chat_id}/status/`] = true;
      return fb_db.ref.update(updates);
    }
    updated_message = msg;
    resolve(updated_message);
  });
};

export const get_last_chat_messages = async (chatId: string) => {
  return new Promise<string>((resolve, reject) => {
    fb_db.ref
      .child("chats")
      .child(chatId)
      .once("value", snapshot => {
        if (snapshot.val()) {
          let lastMessage = snapshot.val()["lastMessage"];
          resolve(lastMessage);
        }
      });
  });
};

export const get_last_chat_status = async (chatId: string, userId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    fb_db.ref
      .child("chats")
      .child(chatId)
      .once("value", snapshot => {
        if (snapshot.val()) {
          if (snapshot.val()["lastSender"] !== userId) {
            if (snapshot.val()["status"] === "false") {
              resolve(false);
            } else {
              resolve(true);
            }
          } else {
            resolve(true);
          }
        }
      });
  });
};

export const get_old_chat_messages = async (
  chatId: string,
) => {
  return new Promise<any[]>((resolve, reject) => {
    fb_db.ref
      .child("messages")
      .child(chatId)
      .orderByKey()
      .once("value", snapshot => {
        let messages = [];
        /* tslint:disable:no-string-literal */
        if (!snapshot) {
          resolve(undefined);
        }
        let promises = [];
        snapshot.forEach(child => {
          if (child && child.val() && child.val()["_id"]) {
            let message: ChatMessage;
            let systemMessage: SystemMessage;
            if (child.val().system) {
              systemMessage = child.val();
              messages.push(systemMessage);
            } else {
              message = child.val();
              messages.push(message);
            }
          }
          /* tslint:enable:no-string-literal */
        });
        Promise.all(promises).then(() => {
          resolve(messages);
        });
      });
  });
};
