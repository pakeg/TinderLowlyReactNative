import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { db } from "../firebase/firebase";
import useAuth from "../hooks/useAuth";
import { getMatchedUserInfo } from "../libs/helpers";

const ChatRow = ({ item }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(item.users, user));
  }, [item, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", item.id, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      ),
      (snapshot) => {
        setLastMessage(snapshot.docs[0]?.data());
      }
    );
  }, [item, db]);
  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}
      onPress={() =>
        navigation.navigate("MessagesScreen", {
          charId: item.id,
          matchedUserInfo,
        })
      }
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={
          matchedUserInfo?.picture.indexOf("https") != -1
            ? { uri: matchedUserInfo?.picture }
            : require(`../assets/${matchedUserInfo?.picture}`)
        }
      />
      <View
        className="flex-1 flex-col"
        style={{ alignSelf: "flex-start", wordBreak: "break-word" }}
      >
        <Text className="text-lg font-semibold">{matchedUserInfo?.name}</Text>
        <Text>
          {lastMessage
            ? lastMessage?.message?.substring(0, 40) + "..."
            : "Write first"}
        </Text>
        <Text>
          {lastMessage &&
            new Date(
              lastMessage?.timestamp?.seconds * 1000
            ).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.2,
    elevation: 2,
  },
});
