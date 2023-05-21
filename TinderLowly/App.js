import React from "react";

import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./components/StackNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <TailwindProvider>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </TailwindProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
}
