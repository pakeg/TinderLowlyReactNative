import React from "react";
import { Text, View, Image } from "react-native";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={require("../assets/Tinder-logo-modal.png")}
      />
      <Text className="text-lg text-red-600">Welcome {user.name} !</Text>
    </View>
  );
};

export default ModalScreen;
