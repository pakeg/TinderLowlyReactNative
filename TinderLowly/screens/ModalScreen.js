import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Toast from "react-native-toast-message";

const ModalScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [picture, setPicture] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");

  const inCompliteForm = !picture || !occupation || !age;

  const updateUser = async () => {
    await setDoc(doc(db, "users", user.id), {
      email: user.email,
      family_name: user.family_name,
      given_name: user.given_name,
      id: user.id,
      locale: "ru",
      name: user.name,
      picture,
      occupation,
      age,
      timestamp: serverTimestamp(),
      verified_email: true,
    })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Data is upadated, 👋",
        });
        navigation.navigate("HomeScreen", { profilexist: true });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Something went wrong, try late.",
        });
      });
  };
  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={require("../assets/Tinder-logo-modal.png")}
      />
      <Text className="text-xl text-gray-600 p-2 font-bold">
        Welcome {user.name} !
      </Text>

      <Text className="text-center text-red-400 p-4 font-bold">
        Step 1: The profile pick
      </Text>
      <TextInput
        value={picture}
        onChangeText={(value) => setPicture(value)}
        className="text-center text-xl pb-2"
        placeholder="Enter a profile pick URL"
      />

      <Text className="text-center text-red-400 p-4 font-bold">
        Step 2: The occupation
      </Text>
      <TextInput
        value={occupation}
        onChangeText={(value) => setOccupation(value)}
        className="text-center text-xl pb-2"
        placeholder="Enter a occupation"
      />

      <Text className="text-center text-red-400 p-4 font-bold">
        Step 3: The age
      </Text>
      <TextInput
        value={age}
        onChangeText={(value) => setAge(value)}
        className="text-center text-xl pb-2"
        placeholder="Enter an age"
        maxLength={2}
        keyboardType="numeric"
      />

      <TouchableOpacity
        disabled={inCompliteForm}
        onPress={updateUser}
        className={`w-64 p-3 rounded-xl absolute bottom-5 ${
          !inCompliteForm ? "bg-red-500" : "bg-gray-500"
        }`}
      >
        <Text className="text-center text-white text-xl">Update profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
