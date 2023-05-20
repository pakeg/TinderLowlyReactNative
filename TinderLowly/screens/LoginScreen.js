import React from "react";
import {
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { promptAsync, request } = useAuth();
  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        className="flex-1"
      >
        <TouchableOpacity
          className={
            "absolute bottom-12 w-52 bg-white p-4 rounded-2xl left-1/2 -translate-x-[104px]"
          }
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text className="text-center font-semibold">
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
