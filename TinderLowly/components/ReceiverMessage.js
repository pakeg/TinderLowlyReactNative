import React from "react";
import { Image, Text, View } from "react-native";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      className="bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14"
      style={{ alignSelf: "flex-start", wordBreak: "break-word" }}
    >
      <Image
        className="h-10 w-10 rounded-full absolute top-0 -left-14"
        source={
          message.picture.indexOf("https") != -1
            ? { uri: message.picture }
            : require(`../assets/${message.picture}`)
        }
      />
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
