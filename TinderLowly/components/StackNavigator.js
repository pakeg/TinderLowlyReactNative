import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="ChatScreen"
            options={{ headerShown: false }}
            component={ChatScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name="LoginScreen"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
