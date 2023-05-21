import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

const MatchScreen = ({ route, navigation }) => {
  const { user, targetUser } = route.params;

  return (
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.9 }}>
      <View className="justify-center px-10 pt-20">
        <Image
          source={require("../assets/its-a-match.png")}
          className="h-12 w-screen"
        />
      </View>
      <Text className="text-white text-center mt-5">
        You and {targetUser.name} have liked each other!
      </Text>
      <View className="flex-row justify-evenly mt-5">
        <Image
          source={
            user.picture.indexOf("https") != -1
              ? { uri: user.picture }
              : require(`../assets/${user.picture}`)
          }
          className="h-24 w-24 rounded-full"
        />
        <Image
          source={
            targetUser.picture.indexOf("https") != -1
              ? { uri: targetUser.picture }
              : require(`../assets/${targetUser.picture}`)
          }
          className="h-24 w-24 rounded-full"
        />
      </View>

      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("ChatScreen");
        }}
      >
        <Text className="text-center">Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
