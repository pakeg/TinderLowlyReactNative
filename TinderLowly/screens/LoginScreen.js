import React from "react";
import { Text, View, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { promptAsync, request } = useAuth();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg text-red-600">LoginScreen inside</Text>
      <Button
        title="Sing up!"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

export default LoginScreen;
