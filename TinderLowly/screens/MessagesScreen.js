import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  Keyboard,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const MessagesScreen = ({ route }) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", route.params.charId, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return { messageId: doc.id, ...doc.data() };
          })
        );
      }
    );
  }, [route.params.charId, db]);

  const sendMessage = async () => {
    await addDoc(collection(db, "matches", route.params.charId, "messages"), {
      id: user.id,
      name: user.given_name,
      picture: user.picture,
      message: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <SafeAreaView>
      <Header callEnabled title={route.params?.matchedUserInfo.name} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            className="pl-4"
            keyExtractor={(item) => item.messageId}
            inverted
            renderItem={({ item: message }) =>
              message.id === user.id ? (
                <SenderMessage key={message.messageId} message={message} />
              ) : (
                <ReceiverMessage key={message.messageId} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-400 px-5 py-2">
          <TextInput
            className="text-lg h-10 flex-1 mr-10"
            style={{ outlineStyle: "none" }}
            placeholder="Send message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MessagesScreen;
