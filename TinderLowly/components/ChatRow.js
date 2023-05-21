import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import useAuth from "../hooks/useAuth";
import { getMatchedUserInfo } from "../libs/helpers";

const ChatRow = ({ item }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(item.users, user));
  }, [item, user]);

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}
      onPress={() => navigation.navigate("MessagesScreen")}
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={
          matchedUserInfo?.picture.indexOf("https") != -1
            ? { uri: matchedUserInfo?.picture }
            : require(`../assets/${matchedUserInfo?.picture}`)
        }
      />
      <View>
        <Text className="text-lg font-semibold">{matchedUserInfo?.name}</Text>
        <Text>Say hi!</Text>
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
