import React from "react";
import { Text, View } from "react-native";

const SenderMessage = ({ message }) => {
  return (
    <View
      className="bg-purple-500 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"
      style={{
        alignSelf: "flex-start",
        marginLeft: "auto",
        wordBreak: "break-word",
      }}
    >
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
